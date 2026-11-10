/**
 * Mascot Configuration - AGSAR Electromechanical Engineering LLP
 * All tunable parameters for the scroll-scrubbed 3D engineer mascot.
 */

export interface MascotSectionRange {
  start: number;
  end: number;
  label: string;
}

export interface BreakpointDimensions {
  width: number;
  height: number;
}

export interface MascotPositionKeyframe {
  /** Target section selector or identifier */
  targetSection: string;
  /** Viewport x placement (% or px string from right) */
  right: string;
  /** Viewport y placement (% or px string from bottom) */
  bottom: string;
  /** Scale factor (1 = default) */
  scale: number;
  /** Opacity (0..1) */
  opacity: number;
}

export interface MascotConfig {
  /** Total extracted frames across all 4 sequences */
  totalFrames: number;
  /** Pattern for desktop WebP frames (720p) */
  desktopFramePath: (index: number) => string;
  /** Pattern for mobile WebP frames (480p, every 2nd frame) */
  mobileFramePath: (index: number) => string;
  /** Frame index ranges corresponding to the 4 website storylines */
  ranges: {
    hero: MascotSectionRange;
    heroToServices: MascotSectionRange;
    services: MascotSectionRange;
    footer: MascotSectionRange;
  };
  /** Canvas viewport dimensions per screen size */
  canvasSize: {
    desktop: BreakpointDimensions;
    tablet: BreakpointDimensions;
    mobile: BreakpointDimensions;
  };
  /** Preloading configuration */
  preloading: {
    /** Number of initial frames loaded before rendering mascot */
    initialFrames: number;
    /** Chunk size when background preloading the rest */
    chunkSize: number;
    /** Delay between background preload batches (ms) */
    chunkDelayMs: number;
  };
  /** ScrollTrigger tuning */
  scroll: {
    /** Scrub smoothness in seconds */
    scrub: number;
    /** Z-Index of fixed mascot layer (above sections, below navbar z-100) */
    zIndex: number;
    /** Static frame to display when prefers-reduced-motion is active */
    reducedMotionFrame: number;
  };
  /** Responsive position keyframes per section (Desktop & Tablet) */
  desktopPositions: MascotPositionKeyframe[];
  /** Responsive position keyframes per section (Mobile <768px) */
  mobilePositions: MascotPositionKeyframe[];
}

export const MASCOT_CONFIG: MascotConfig = {
  totalFrames: 411,

  desktopFramePath: (index: number) =>
    `/frames-webp/frame_${String(index).padStart(4, '0')}.webp`,

  mobileFramePath: (index: number) => {
    // Mobile has every 2nd frame (1, 3, 5, ..., 411)
    const mobileIndex = index % 2 === 1 ? index : Math.min(411, index + 1);
    return `/frames-webp-mobile/frame_${String(mobileIndex).padStart(4, '0')}.webp`;
  },

  ranges: {
    // 1. Hero: peeks in from the right edge and steps into view, looking toward the hero video
    hero: {
      start: 1,
      end: 120,
      label: 'Hero: Peeking in from right edge and watching hero video',
    },
    // 2. Transition (Hero to Services): looks down, lifts head and notices cards
    heroToServices: {
      start: 121,
      end: 210,
      label: 'Transition: Looking down toward services and engineering solutions',
    },
    // 3. Services (looping cards): thinking pose, looking right then left to follow the cards
    services: {
      start: 211,
      end: 351,
      label: 'Services: Thinking and tracking looping engineering service cards',
    },
    // 4. Footer: turns to the viewer and waves hello as the footer enters
    footer: {
      start: 352,
      end: 411,
      label: 'Footer: Turning toward user and waving hello at footer',
    },
  },

  canvasSize: {
    desktop: { width: 340, height: 340 },
    tablet: { width: 260, height: 260 },
    mobile: { width: 130, height: 130 },
  },

  preloading: {
    initialFrames: 30,
    chunkSize: 20,
    chunkDelayMs: 60,
  },

  scroll: {
    scrub: 0.5,
    zIndex: 50,
    reducedMotionFrame: 380, // Friendly waving pose
  },

  desktopPositions: [
    {
      targetSection: '#hero',
      right: '3vw',
      bottom: '4vh',
      scale: 1.0,
      opacity: 1.0,
    },
    {
      targetSection: '#about',
      right: '2.5vw',
      bottom: '8vh',
      scale: 0.9,
      opacity: 0.95,
    },
    {
      targetSection: '#services',
      right: '3.5vw',
      bottom: '12vh',
      scale: 1.0,
      opacity: 1.0,
    },
    {
      targetSection: '#expertise',
      right: '2.5vw',
      bottom: '8vh',
      scale: 0.88,
      opacity: 0.9,
    },
    {
      targetSection: '#why-choose-us',
      right: '2.5vw',
      bottom: '8vh',
      scale: 0.88,
      opacity: 0.9,
    },
    {
      targetSection: '#contact',
      // Shift slightly lower right so all inputs and buttons remain completely clear
      right: '2vw',
      bottom: '3vh',
      scale: 0.82,
      opacity: 0.85,
    },
    {
      targetSection: '#footer',
      // Center-right above footer content, waving
      right: '6vw',
      bottom: '14vh',
      scale: 1.05,
      opacity: 1.0,
    },
  ],

  mobilePositions: [
    {
      targetSection: '#hero',
      right: '12px',
      bottom: '16px',
      scale: 1.0,
      opacity: 0.95,
    },
    {
      targetSection: '#services',
      right: '12px',
      bottom: '24px',
      scale: 0.95,
      opacity: 0.95,
    },
    {
      targetSection: '#footer',
      right: '16px',
      bottom: '32px',
      scale: 1.0,
      opacity: 1.0,
    },
  ],
};

