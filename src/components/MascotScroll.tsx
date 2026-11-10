import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MASCOT_CONFIG, BreakpointDimensions } from '../config/mascot.config';
import '../styles/mascot.css';

gsap.registerPlugin(ScrollTrigger);

export const MascotScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const isTabVisibleRef = useRef<boolean>(true);

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [dimensions, setDimensions] = useState<BreakpointDimensions>(() => {
    if (typeof window === 'undefined') return MASCOT_CONFIG.canvasSize.desktop;
    if (window.innerWidth < 768) return MASCOT_CONFIG.canvasSize.mobile;
    if (window.innerWidth < 1024) return MASCOT_CONFIG.canvasSize.tablet;
    return MASCOT_CONFIG.canvasSize.desktop;
  });

  // Calculate current breakpoint dimensions
  const updateDimensions = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width < 768;
    setIsMobile(mobile);
    if (mobile) {
      setDimensions(MASCOT_CONFIG.canvasSize.mobile);
    } else if (width < 1024) {
      setDimensions(MASCOT_CONFIG.canvasSize.tablet);
    } else {
      setDimensions(MASCOT_CONFIG.canvasSize.desktop);
    }
  }, []);

  // Frame rendering on canvas with HiDPI support and "contain" aspect ratio sizing
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !isTabVisibleRef.current) return;

      const cache = imagesCacheRef.current;
      let img = cache.get(frameIndex);

      // If exact frame not ready yet, pick nearest available frame to prevent blank flicker
      if (!img) {
        let minDiff = Infinity;
        for (const [idx, cachedImg] of cache.entries()) {
          const diff = Math.abs(idx - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            img = cachedImg;
          }
        }
      }

      if (!img) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle Device Pixel Ratio
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = dimensions.width;
      const targetH = dimensions.height;
      const pixelW = Math.round(targetW * dpr);
      const pixelH = Math.round(targetH * dpr);

      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      ctx.clearRect(0, 0, pixelW, pixelH);

      // Draw with contain sizing centered
      const hRatio = pixelW / img.naturalWidth;
      const vRatio = pixelH / img.naturalHeight;
      const ratio = Math.min(hRatio, vRatio);
      const renderW = img.naturalWidth * ratio;
      const renderH = img.naturalHeight * ratio;
      const offsetX = (pixelW - renderW) / 2;
      const offsetY = (pixelH - renderH) / 2;

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, offsetX, offsetY, renderW, renderH);
    },
    [dimensions]
  );

  // Background frame loader
  const preloadFrames = useCallback(
    (onFirstFrameReady: () => void) => {
      const total = MASCOT_CONFIG.totalFrames;
      const getPath = isMobile
        ? MASCOT_CONFIG.mobileFramePath
        : MASCOT_CONFIG.desktopFramePath;

      const initialCount = MASCOT_CONFIG.preloading.initialFrames;
      let firstLoaded = false;

      // 1. Load initial frames immediately
      const loadFrame = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          if (imagesCacheRef.current.has(index)) {
            resolve();
            return;
          }
          const img = new Image();
          img.src = getPath(index);
          img.onload = () => {
            imagesCacheRef.current.set(index, img);
            if (!firstLoaded && index === 1) {
              firstLoaded = true;
              onFirstFrameReady();
            }
            resolve();
          };
          img.onerror = () => {
            resolve(); // Don't block
          };
        });
      };

      // Load initial batch
      const initialPromises: Promise<void>[] = [];
      const step = isMobile ? 2 : 1;
      for (let i = 1; i <= Math.min(initialCount, total); i += step) {
        initialPromises.push(loadFrame(i));
      }

      Promise.all(initialPromises).then(() => {
        if (!firstLoaded) {
          firstLoaded = true;
          onFirstFrameReady();
        }

        // 2. Background load the rest in non-blocking batches
        let currentIndex = initialCount + 1;
        const chunkSize = MASCOT_CONFIG.preloading.chunkSize;
        const chunkDelay = MASCOT_CONFIG.preloading.chunkDelayMs;

        const loadNextChunk = () => {
          if (currentIndex > total) return;
          const chunkPromises: Promise<void>[] = [];
          for (
            let j = 0;
            j < chunkSize && currentIndex <= total;
            j++, currentIndex += step
          ) {
            chunkPromises.push(loadFrame(currentIndex));
          }

          Promise.all(chunkPromises).then(() => {
            if (currentIndex <= total) {
              setTimeout(loadNextChunk, chunkDelay);
            }
          });
        };

        setTimeout(loadNextChunk, chunkDelay);
      });
    },
    [isMobile]
  );

  // Handle visibility change (pause when tab hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        renderFrame(currentFrameRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [renderFrame]);

  // Handle resize and motion preference
  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
      ScrollTrigger.refresh();
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [updateDimensions]);

  // Initialize GSAP scroll scrub & positioning
  useEffect(() => {
    let scrubTween: gsap.core.Tween | null = null;
    const triggers: ScrollTrigger[] = [];

    // Preload frames
    preloadFrames(() => {
      // First frame ready
      renderFrame(currentFrameRef.current);
    });

    if (prefersReducedMotion) {
      // Reduced motion: show static friendly waving frame without scrubbing
      const staticFrame = MASCOT_CONFIG.scroll.reducedMotionFrame;
      currentFrameRef.current = staticFrame;
      renderFrame(staticFrame);
      return;
    }

    // GSAP Scroll Scrub Timeline driving frame index from scroll progress
    const state = { frame: 1 };
    const total = MASCOT_CONFIG.totalFrames;

    scrubTween = gsap.to(state, {
      frame: total,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: MASCOT_CONFIG.scroll.scrub,
        onUpdate: () => {
          const target = Math.round(state.frame);
          if (target !== currentFrameRef.current) {
            currentFrameRef.current = target;
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = requestAnimationFrame(() => {
              renderFrame(target);
            });
          }
        },
      },
    });

    // Trajectory: Position and scale mascot along the page
    const container = containerRef.current;
    if (container) {
      const positions = isMobile
        ? MASCOT_CONFIG.mobilePositions
        : MASCOT_CONFIG.desktopPositions;

      // Apply initial position from first keyframe
      const initial = positions[0];
      if (initial) {
        gsap.set(container, {
          right: initial.right,
          bottom: initial.bottom,
          scale: initial.scale,
          opacity: initial.opacity,
        });
      }

      // Chain smooth keyframes across each subsequent section
      for (let i = 1; i < positions.length; i++) {
        const kf = positions[i];
        const prevKf = positions[i - 1];
        const targetEl = document.querySelector(kf.targetSection);

        if (targetEl) {
          const trg = ScrollTrigger.create({
            trigger: targetEl,
            start: 'top 85%',
            end: 'top 30%',
            scrub: MASCOT_CONFIG.scroll.scrub,
            onUpdate: (self) => {
              const p = self.progress;
              // Smooth lerp between prevKf and cur kf
              const scale = prevKf.scale + (kf.scale - prevKf.scale) * p;
              const opacity = prevKf.opacity + (kf.opacity - prevKf.opacity) * p;

              // Parse percentages / values for position
              gsap.set(container, {
                right: p > 0.5 ? kf.right : prevKf.right,
                bottom: p > 0.5 ? kf.bottom : prevKf.bottom,
                scale,
                opacity,
              });
            },
          });
          triggers.push(trg);
        }
      }
    }

    // Refresh ScrollTrigger after initial mount and font/image settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (scrubTween) {
        scrubTween.scrollTrigger?.kill();
        scrubTween.kill();
      }
      triggers.forEach((t) => t.kill());
    };
  }, [isMobile, prefersReducedMotion, preloadFrames, renderFrame]);

  return (
    <div
      ref={containerRef}
      className="mascot-scroll-container"
      style={{
        zIndex: MASCOT_CONFIG.scroll.zIndex,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="mascot-canvas"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      />
    </div>
  );
};

