import { motion } from 'framer-motion'
import { voltages } from '../content'
import Reveal from './Reveal'

const tone = {
  LT: { bar: 'from-sky/45 to-sky/10', cap: 'bg-sky' },
  HT: { bar: 'from-red to-red/20', cap: 'bg-coral' },
  EHT: { bar: 'from-[#6F95E8] to-[#6F95E8]/20', cap: 'bg-sky' },
}

export default function VoltageLadder() {
  const ht = voltages.filter((v) => v.cls === 'HT').length
  const eht = voltages.filter((v) => v.cls === 'EHT').length

  return (
    <section id="grid" className="relative overflow-hidden bg-navy py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-end gap-14 px-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="eyebrow !text-coral">The grid we work on</p>
          <h2 className="h2 mt-4 !text-panel">
            From the panel to the <span className="italic text-coral">EHT bay.</span>
          </h2>
          <p className="mt-6 max-w-md text-sky/85">
            Low-tension panels, HT distribution and extra-high-tension substations all need
            different skills, equipment and safety practice. We work across the whole ladder.
          </p>
          <p className="mt-4 text-xs text-sky/50">Indicative voltage classes.</p>
        </Reveal>

        <div>
          <div className="flex h-72 items-end gap-2 md:h-96 md:gap-3">
            {voltages.map((v, i) => (
              <div key={v.label} className="flex h-full flex-1 flex-col justify-end">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{ height: `${v.h}%`, transformOrigin: 'bottom' }}
                  className={`relative rounded-t-xl bg-gradient-to-t ${tone[v.cls].bar}`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 rounded-full ${tone[v.cls].cap}`} />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-panel md:text-xs">
                    {v.label}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          <div
            className="mt-3 grid gap-2 text-center text-xs font-semibold tracking-widest"
            style={{ gridTemplateColumns: `1fr ${ht}fr ${eht}fr` }}
          >
            <span className="rounded-full border border-sky/25 py-1.5 text-sky">LT</span>
            <span className="rounded-full border border-coral/60 py-1.5 text-coral">HT</span>
            <span className="rounded-full border border-[#6F95E8]/60 py-1.5 text-[#B8CDF5]">EHT</span>
          </div>
        </div>
      </div>
    </section>
  )
}
