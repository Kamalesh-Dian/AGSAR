import { company, nav, sectors } from '../content'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <p className="max-w-xs text-sm text-sky/85">
          {company.name}. Solar, BESS, wind, HT, EHT, pumps and motors.
        </p>
        <div>
          <p className="eyebrow !text-coral">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sky/85 transition hover:text-panel">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-coral">Sectors</p>
          <ul className="mt-4 space-y-2 text-sm text-sky/85">
            {sectors.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-10 select-none bg-gradient-to-b from-panel/25 to-transparent bg-clip-text text-center font-display text-[26vw] font-semibold leading-[0.8] text-transparent"
      >
        AGSAR
      </p>

      <div className="relative border-t border-panel/10 bg-navydeep px-6 py-5 text-center text-xs text-sky/60">
        © 2026 {company.name}. All rights reserved.
      </div>
    </footer>
  )
}
