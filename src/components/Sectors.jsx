import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sectors } from '../content'
import SectorIcon from './SectorIcon'
import Reveal from './Reveal'

function Card({ s, i, active, onSelect }) {
  const [broken, setBroken] = useState(false)

  return (
    <motion.article
      role="tab"
      aria-selected={active}
      initial={false}
      animate={{ flexGrow: active ? 6 : 1 }}
      transition={{ type: 'spring', stiffness: 130, damping: 24 }}
      onClick={() => onSelect(i)}
      style={{
        flexBasis: 0,
        background: `linear-gradient(160deg, ${s.accent} 0%, #12275A 88%)`,
      }}
      className="relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[28px]"
    >
      {/* Illustrated fallback, always underneath */}
      <div className="absolute inset-0 grid place-items-center text-panel">
        <SectorIcon id={s.id} className="h-40 w-40 opacity-25" />
      </div>

      {!broken && (
        <motion.img
          src={s.image}
          alt={s.name}
          loading="lazy"
          onError={() => setBroken(true)}
          initial={false}
          animate={{
            scale: active ? 1 : 1.25,
            filter: active ? 'saturate(1) brightness(1)' : 'saturate(0.6) brightness(0.75)',
          }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-navydeep/90 via-navy/30 to-transparent" />

      {/* Collapsed label */}
      <div
        className={`absolute inset-0 flex items-center gap-4 p-5 transition-opacity duration-300 md:flex-col md:items-start md:justify-end md:p-6 ${
          active ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <span className="font-display text-sm text-panel/80">{String(i + 1).padStart(2, '0')}</span>
        <span className="font-display text-xl text-panel md:rotate-180 md:[writing-mode:vertical-rl]">
          {s.name}
        </span>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="absolute inset-x-0 bottom-0 p-5 md:p-9"
          >
            <div className="flex items-center gap-3 text-panel">
              <SectorIcon id={s.id} className="h-8 w-8" />
              <span className="font-display text-sm text-panel/80">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-3 font-display text-3xl text-panel md:text-5xl">{s.name}</h3>
            <p className="mt-1 text-lg text-coral">{s.tagline}</p>
            <p className="mt-3 line-clamp-3 max-w-xl text-sm text-sky md:line-clamp-none md:text-base">
              {s.desc}
            </p>
            <ul className="mt-4 hidden flex-wrap gap-2 md:flex">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-panel/25 bg-panel/10 px-3.5 py-1.5 text-xs text-panel backdrop-blur"
                >
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => window.dispatchEvent(new CustomEvent('pick-sector', { detail: s.name }))}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-red hover:text-panel"
            >
              Enquire about {s.name}
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function Sectors() {
  const [active, setActive] = useState(0)
  const n = sectors.length
  const go = (d) => setActive((a) => (a + d + n) % n)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      go(-1)
    }
  }

  return (
    <section id="sectors" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="h2 mt-4 max-w-2xl">
              Six sectors. <span className="italic text-red">One engineering team.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-4">
            <span className="font-display text-lg text-navy">
              {String(active + 1).padStart(2, '0')}
              <span className="text-navy/40"> / {String(n).padStart(2, '0')}</span>
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous sector"
              className="grid h-12 w-12 place-items-center rounded-full border border-navy/20 text-navy transition hover:bg-navy/5"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next sector"
              className="grid h-12 w-12 place-items-center rounded-full bg-red text-panel transition hover:bg-reddark"
            >
              →
            </button>
          </Reveal>
        </div>

        <div
          role="tablist"
          aria-label="Sectors"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-12 flex h-[760px] flex-col gap-3 outline-none focus-visible:ring-2 focus-visible:ring-blue/60 md:h-[580px] md:flex-row"
        >
          {sectors.map((s, i) => (
            <Card key={s.id} s={s} i={i} active={i === active} onSelect={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
