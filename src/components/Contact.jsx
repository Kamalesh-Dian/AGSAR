import { useEffect, useState } from 'react'
import { contact, sectors } from '../content'
import Reveal from './Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', sector: '', message: '' })

  // Sector cards fire this event so "Enquire about X" pre-selects the sector
  useEffect(() => {
    const onPick = (e) => setForm((f) => ({ ...f, sector: e.detail }))
    window.addEventListener('pick-sector', onPick)
    return () => window.removeEventListener('pick-sector', onPick)
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // No backend yet: this opens the visitor's mail app. Swap for a form service or API later.
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Enquiry${form.sector ? `: ${form.sector}` : ''} from ${form.name}`
    const body = `${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-red/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="h2 mt-4">
            Have a site in mind? <span className="italic text-red">Let's talk.</span>
          </h2>
          <p className="mt-6 max-w-md text-navy/80">
            Tell us about the project, the sector and the timeline. We will come back with the
            next step.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-navy/50">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="text-lg text-navy hover:text-red">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-navy/50">Phone</dt>
              <dd className="text-lg text-navy">{contact.phone}</dd>
            </div>
            <div>
              <dt className="text-navy/50">Office</dt>
              <dd className="text-lg text-navy">{contact.address}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-[28px] border border-navy/10 bg-band/70 p-6 backdrop-blur md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="field" placeholder="Your name" required value={form.name} onChange={set('name')} />
              <input className="field" type="email" placeholder="Email" required value={form.email} onChange={set('email')} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="field" placeholder="Phone" value={form.phone} onChange={set('phone')} />
              <select className="field" value={form.sector} onChange={set('sector')} aria-label="Sector">
                <option value="">Select sector</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="field min-h-36 resize-y"
              placeholder="Tell us about your project"
              required
              value={form.message}
              onChange={set('message')}
            />
            <button
              type="submit"
              className="w-full rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-panel transition hover:bg-reddark"
            >
              Send enquiry
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
