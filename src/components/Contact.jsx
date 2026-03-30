import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94]

function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.073-1.118l-.292-.174-3.015.857.844-2.94-.19-.302A7.946 7.946 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
    </svg>
  )
}

const CONTACT_ITEMS = [
  {
    icon: <Mail size={14}/>,
    href: 'mailto:mozhgannamiseghinsara@gmail.com',
    label: 'Email',
    text: 'mozhgannamiseghinsara@gmail.com',
  },
  {
    icon: <WaIcon />,
    href: 'https://wa.me/393515993144',
    label: 'WhatsApp',
    text: '+39 351 599 3144',
  },
  {
    icon: <IgIcon />,
    href: 'https://www.instagram.com/mozhganphotography/',
    label: 'Instagram',
    text: '@mozhganphotography',
  },
  {
    icon: <MapPin size={14}/>,
    href: 'https://maps.google.com/?q=Turin,Italy',
    label: 'Location',
    text: 'Turin, Italy',
  },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ name: '', contact: '', type: 'Fashion & Editorial', message: '' })
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    const subject = encodeURIComponent(`Photography Enquiry — ${form.type}`)
    const body    = encodeURIComponent(
      `Name: ${form.name}\nContact: ${form.contact}\nSession Type: ${form.type}\n\n${form.message}`
    )
    window.open(`mailto:mozhgannamiseghinsara@gmail.com?subject=${subject}&body=${body}`)
    setTimeout(() => { setSent(true); setBusy(false) }, 800)
  }

  return (
    <section id="contact" className="contact" ref={ref}>

      {/* ── Left: info ── */}
      <motion.div
        className="contact-left"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease }}
      >
        <div className="sec-label">Let's Connect</div>
        <h2 className="sec-title">Begin a<br /><em>Conversation</em></h2>

        <p className="contact-tagline">
          "Every great photograph begins with a single conversation about what matters."
        </p>

        <p className="contact-body">
          Based in Turin, Italy — available worldwide for commissions, campaigns,
          and collaborations. Reach out via email, WhatsApp, or Instagram DM.
          I respond within 24 hours.
        </p>

        <div className="contact-links">
          {CONTACT_ITEMS.map(({ icon, href, label, text }) => (
            <a key={label} href={href} className="contact-link"
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
              <span className="contact-link-icon">{icon}</span>
              <span>
                <span style={{
                  display: 'block', fontSize: '.56rem', letterSpacing: '.16em',
                  textTransform: 'uppercase', color: 'var(--stone-light)',
                  fontFamily: 'var(--ff-sans)', marginBottom: 2,
                }}>{label}</span>
                {text}
              </span>
            </a>
          ))}
        </div>

        {/* Quick-reach buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://wa.me/393515993144"
            target="_blank" rel="noopener noreferrer"
            className="btn-dark"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.65rem' }}>
            <WaIcon /> Chat on WhatsApp
          </a>
          <a href="https://www.instagram.com/mozhganphotography/"
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.65rem' }}>
            <IgIcon /> Instagram DM
          </a>
        </div>
      </motion.div>

      {/* ── Right: form ── */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: .15, ease }}
      >
        {sent ? (
          <div style={{
            minHeight: 500, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            padding: '60px 40px', background: 'var(--rose-pale)',
          }}>
            <div style={{
              fontFamily: 'var(--ff-display)', fontSize: '3.5rem',
              fontStyle: 'italic', color: 'var(--rose-dark)', marginBottom: 16,
            }}>
              Thank you.
            </div>
            <p style={{ fontSize: '.9rem', color: 'var(--stone)', lineHeight: 1.8, maxWidth: 340 }}>
              Your email client has opened with the message pre-filled.
              Send it and I'll be in touch within 24 hours.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="https://wa.me/393515993144"
                target="_blank" rel="noopener noreferrer"
                className="btn-dark"
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.65rem' }}>
                <WaIcon /> WhatsApp instead
              </a>
              <button onClick={() => setSent(false)} className="btn-outline"
                style={{ fontSize: '.65rem', cursor: 'none' }}>
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label>Your Name</label>
                <input type="text" placeholder="Sofia Rossi" required
                  value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="field">
                <label>Email or WhatsApp</label>
                <input type="text" placeholder="you@email.com or +39..." required
                  value={form.contact} onChange={e => update('contact', e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Session Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)}>
                {[
                  'Fashion & Editorial',
                  'Fine Art Portrait',
                  'Product & Brand',
                  'Creative Direction',
                  'Film & Motion',
                  'Workshop',
                  'Other',
                ].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Tell Me About Your Project</label>
              <textarea rows={6}
                placeholder="Share your vision, timeline, and any details that feel important..."
                value={form.message} onChange={e => update('message', e.target.value)} />
            </div>

            <button type="submit" className="btn-dark"
              style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', cursor: 'none' }}
              disabled={busy}>
              {busy ? 'Opening email...' : <><span>Send Enquiry</span><Send size={14} /></>}
            </button>

            <p style={{ fontSize: '.62rem', color: 'var(--stone-light)', letterSpacing: '.06em', fontFamily: 'var(--ff-sans)', lineHeight: 1.7 }}>
              Submitting opens your email client pre-filled to mozhgannamiseghinsara@gmail.com.
              You can also reach out directly via WhatsApp or Instagram DM above.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  )
}
