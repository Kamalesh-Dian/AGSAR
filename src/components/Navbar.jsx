import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { nav } from '../content'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="AGSAR home">
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="#E5483A" />
        <path d="M34 16 L23 35 H31 L28 48 L42 28 H34 Z" fill="#FFFDF8" />
      </svg>
      <span className="font-display text-xl tracking-wide text-navy">AGSAR</span>
    </a>
  )
}

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200)
  })

  return (
    <motion.header
      animate={{ y: hidden && !open ? -110 : 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-navy/10 bg-cream/80 py-2.5 pl-5 pr-2.5 backdrop-blur-xl">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-4 py-2 text-sm text-navy/75 transition hover:bg-navy/5 hover:text-navy"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="rounded-full bg-red px-5 py-2 text-sm font-semibold text-panel transition hover:bg-reddark"
          >
            Get a quote
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-px w-4 bg-navy transition ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[11px] h-px w-4 bg-navy transition ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-navy/10 bg-cream/95 p-2 backdrop-blur-xl md:hidden"
          >
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-5 py-3 text-navy transition hover:bg-navy/5"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
