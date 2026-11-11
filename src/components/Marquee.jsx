import { sectors } from '../content'

export default function Marquee() {
  const items = [...sectors, ...sectors]
  return (
    <div className="overflow-hidden border-y border-navy/10 bg-band py-5" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl text-navy md:text-3xl">
            {s.name}
            <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} />
          </span>
        ))}
      </div>
    </div>
  )
}
