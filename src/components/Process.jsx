import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { steps } from '../content'
import Reveal from './Reveal'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const root = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.fromTo(
          '.process-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: '.process-list',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: true,
            },
          },
        )
        gsap.utils.toArray('.step-dot').forEach((dot) => {
          ScrollTrigger.create({
            trigger: dot,
            start: 'top 70%',
            end: 'max',
            toggleClass: { targets: dot, className: 'is-on' },
          })
        })
      },
      root,
    )
    return () => mm.revert()
  }, [])

  return (
    <section id="process" ref={root} className="relative bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow !text-coral">How we deliver</p>
          <h2 className="h2 mt-4 !text-panel">
            Five stages, <span className="italic text-coral">no loose ends.</span>
          </h2>
        </Reveal>

        <div className="process-list relative mt-20">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-panel/15 md:left-1/2 md:-translate-x-1/2">
            <div className="process-fill h-full w-full origin-top bg-gradient-to-b from-coral to-red" />
          </div>

          {steps.map((s, i) => {
            const right = i % 2 === 1
            return (
              <div key={s.title} className="relative pb-16 pl-12 last:pb-0 md:grid md:grid-cols-2 md:pl-0">
                <span className="step-dot absolute left-[7px] top-2 z-10 h-4 w-4 rounded-full border border-panel/30 bg-navy md:left-1/2 md:-translate-x-1/2" />
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                  className={right ? 'md:col-start-2 md:pl-16' : 'md:pr-16 md:text-right'}
                >
                  <span className="font-display text-sm text-coral">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-display text-3xl text-panel">{s.title}</h3>
                  <p className="mt-3 text-sky/85">{s.text}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
