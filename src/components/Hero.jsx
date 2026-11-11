import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { company } from '../content'

gsap.registerPlugin(ScrollTrigger)

const words = ['Powering', 'the', 'grid,', 'from', 'sun', 'to', 'substation.']

const clouds = [
  { img: '/images/cloud-1.png', y: 55, w: 340, h: 127, d: 58, delay: -18, o: 0.92 },
  { img: '/images/cloud-2.png', y: 95, w: 250, h: 140, d: 48, delay: -38, o: 0.88 },
  { img: '/images/cloud-full.png', y: 145, w: 380, h: 127, d: 74, delay: -8, o: 0.82 },
  { img: '/images/cloud-2.png', y: 35, w: 260, h: 146, d: 82, delay: -58, o: 0.72 },
  { img: '/images/cloud-1.png', y: 195, w: 310, h: 116, d: 65, delay: -28, o: 0.76 },
]

// Foreground solar rows, drawn in rough perspective
const rows = [0, 1, 2, 3].map((r) => {
  const w = 64 + r * 26
  const h = 20 + r * 9
  const gap = 8 + r * 3
  return {
    r,
    w,
    h,
    gap,
    sk: 5 + r * 3,
    y: 668 + r * 34 + r * r * 3,
    n: Math.ceil(1560 / (w + gap)),
    offset: -40 + (r % 2) * 22,
  }
})

function Turbine({ x, y, h, d, o = 1, c = '#12275A' }) {
  const L = h * 0.42
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path
        d={`M${-h * 0.018} 0 L${-h * 0.008} ${-h} L${h * 0.008} ${-h} L${h * 0.018} 0 Z`}
        fill={c}
      />
      <g transform={`translate(0 ${-h})`}>
        <g className="blades" style={{ '--d': `${d}s` }}>
          <circle r={L} fill="none" />
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              transform={`rotate(${a})`}
              d={`M0 0 L${-L * 0.045} ${-L * 0.2} L0 ${-L} L${L * 0.03} ${-L * 0.2} Z`}
              fill={c}
            />
          ))}
        </g>
        <circle r={h * 0.024} fill="#E5483A" />
      </g>
    </g>
  )
}

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const full = {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
        gsap.to('.hero-sun', { y: 270, ease: 'none', scrollTrigger: full })
        gsap.to('.hero-dusk', { opacity: 0.5, ease: 'none', scrollTrigger: full })
        gsap.to('.hero-clouds', { y: -40, ease: 'none', scrollTrigger: full })
        gsap.to('.hero-far', { y: 24, ease: 'none', scrollTrigger: full })
        gsap.to('.hero-mid', { y: 56, ease: 'none', scrollTrigger: full })
        gsap.to('.hero-fg', { y: 96, ease: 'none', scrollTrigger: full })
        gsap.to('.hero-copy', {
          y: -90,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '55% top', scrub: true },
        })
      },
      root,
    )
    return () => mm.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative h-[100svh] min-h-[660px] overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BFD3F2" />
            <stop offset="0.55" stopColor="#D9E3F5" />
            <stop offset="0.85" stopColor="#F3E4D4" />
            <stop offset="1" stopColor="#F7F2E8" />
          </linearGradient>
          <radialGradient id="sunGlow">
            <stop offset="0" stopColor="#E5483A" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#E5483A" stopOpacity="0.14" />
            <stop offset="1" stopColor="#E5483A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunFill">
            <stop offset="0" stopColor="#FF9C8E" />
            <stop offset="1" stopColor="#E5483A" />
          </radialGradient>
          <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2F5FC9" />
            <stop offset="1" stopColor="#12275A" />
          </linearGradient>
        </defs>

        <rect width="1440" height="800" fill="url(#sky)" />

        <g className="hero-clouds">
          {clouds.map((c, i) => (
            <g
              key={i}
              className="cloud"
              style={{
                animationDuration: `${c.d}s`,
                animationDelay: `${c.delay}s`,
              }}
            >
              <image
                href={c.img}
                x={0}
                y={c.y}
                width={c.w}
                height={c.h}
                opacity={c.o}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          ))}
        </g>

        <g className="hero-sun">
          <circle className="sun-glow" cx="720" cy="560" r="300" fill="url(#sunGlow)" />
          <circle cx="720" cy="560" r="72" fill="url(#sunFill)" />
        </g>

        <g className="hero-far">
          <Turbine x={120} y={650} h={130} d={20} o={0.55} c="#6F8BC4" />
          <Turbine x={520} y={645} h={120} d={22} o={0.5} c="#6F8BC4" />
          <Turbine x={930} y={645} h={112} d={21} o={0.5} c="#6F8BC4" />
          <path
            d="M0 640 C 200 590, 380 620, 560 600 S 900 570, 1100 610 S 1360 600, 1440 590 V800 H0 Z"
            fill="#B3C5E8"
          />
        </g>

        <g className="hero-mid">
          <Turbine x={300} y={730} h={290} d={12} />
          <Turbine x={1120} y={720} h={330} d={15} />
          <Turbine x={1340} y={720} h={210} d={18} />
          <path
            d="M0 690 C 240 650, 420 680, 700 660 S 1100 640, 1440 675 V800 H0 Z"
            fill="#2F5FC9"
          />
        </g>

        <rect className="hero-dusk" width="1440" height="800" fill="#12275A" opacity="0" />

        <g className="hero-fg">
          <rect x="-40" y="662" width="1520" height="260" fill="#0C1D49" />
          {rows.map((row) =>
            Array.from({ length: row.n }, (_, k) => {
              const x = row.offset + k * (row.w + row.gap)
              const d = `M${x} ${row.y} L${x + row.w} ${row.y} L${x + row.w + row.sk} ${row.y + row.h} L${x - row.sk} ${row.y + row.h} Z`
              return (
                <g key={`${row.r}-${k}`}>
                  <path d={d} fill="url(#panel)" stroke="#8EA8E0" strokeWidth="0.6" />
                  <path
                    d={d}
                    fill="#FFFDF8"
                    className="glint"
                    style={{ animationDelay: `${((k * 0.37 + row.r * 0.9) % 6).toFixed(2)}s` }}
                  />
                </g>
              )
            }),
          )}
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent" />

      <div className="hero-copy relative z-10 mx-auto max-w-6xl px-6 pt-36 md:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow"
        >
          {company.name}
        </motion.p>

        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] text-navy">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
              <motion.span
                className={`inline-block ${i >= 4 ? 'italic text-red' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-6 max-w-xl text-base text-navy/80 md:text-lg"
        >
          Electromechanical engineering for solar, battery storage, wind, HT and EHT networks,
          pumps and motors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="pointer-events-auto mt-9 flex flex-wrap gap-3"
        >
          <a
            href="#sectors"
            className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-panel transition hover:bg-reddark"
          >
            Explore sectors
          </a>
          <a
            href="#contact"
            className="rounded-full border border-navy/30 px-7 py-3.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
          >
            Talk to our team
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-navy/60">
        <span className="block animate-bounce">Scroll</span>
      </div>
    </section>
  )
}
