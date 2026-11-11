import { useState } from 'react'
import { motion } from 'framer-motion'
import { company, pillars } from '../content'
import Reveal from './Reveal'

function ReelFrame() {
  const [broken, setBroken] = useState(false)
  return (
    <motion.div
      initial={{ clipPath: 'inset(12% 8% 12% 8% round 40px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative aspect-video overflow-hidden border border-navy/10 bg-gradient-to-br from-sky to-band"
    >
      {/* Grid pattern shows if the video is not there yet */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(18,39,90,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,39,90,.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {!broken && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/media/site-reel.mp4"
          poster="/media/site-reel-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setBroken(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">About us</p>
            <h2 className="h2 mt-4">
              Engineering that <span className="italic text-red">keeps the lights on.</span>
            </h2>
            <p className="mt-6 max-w-lg text-navy/80">
              {company.name} delivers electrical and mechanical works for renewable energy,
              high-voltage networks and industrial plant, from first survey to commissioning and
              beyond.
            </p>
          </Reveal>
          <ReelFrame />
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-navy/10 bg-panel p-7 transition hover:border-red/50">
                <span className="font-display text-sm text-reddark">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-2xl text-navy">{p.title}</h3>
                <p className="mt-3 text-sm text-navy/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
