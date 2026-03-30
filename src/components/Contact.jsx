import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, ExternalLink, Send } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm]   = useState({ name:'', email:'', type:'Fashion', message:'' })
  const [sent, setSent]   = useState(false)
  const [busy, setBusy]   = useState(false)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setTimeout(() => { setSent(true); setBusy(false) }, 1200)
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      {/* Left */}
      <motion.div
        className="contact-left"
        initial={{ opacity:0, x:-50 }}
        animate={inView ? {opacity:1,x:0} : {}}
        transition={{ duration:1, ease }}
      >
        <div className="sec-label">Let's Connect</div>
        <h2 className="sec-title">Begin a<br /><em>Conversation</em></h2>

        <p className="contact-tagline">
          "Every great photograph begins with a single conversation about what matters."
        </p>

        <p className="contact-body">
          Whether you're a brand looking for campaign imagery, an individual
          seeking a portrait session, or a creative in search of a collaborator
          — I'd love to hear from you. Response within 24 hours.
        </p>

        <div className="contact-links">
          {[
            { icon:<Mail size={14}/>,     href:'mailto:hello@mozhgannami.com',  text:'hello@mozhgannami.com' },
            { icon:<Phone size={14}/>,    href:'tel:+33612345678',              text:'+33 6 12 34 56 78' },
            { icon:<MapPin size={14}/>,   href:'#',                             text:'Paris & Tehran' },
            { icon:<ExternalLink size={14}/>,href:'https://instagram.com',      text:'@mozhgannami' },
          ].map(({ icon, href, text }) => (
            <a key={text} href={href} className="contact-link" target={href.startsWith('http')?'_blank':undefined}>
              <span className="contact-link-icon">{icon}</span>
              {text}
            </a>
          ))}
        </div>

        {/* Brands marquee strip */}
        <div style={{
          marginTop:16, paddingTop:28,
          borderTop:'1px solid var(--parchment)',
        }}>
          <div style={{ fontSize:'.6rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--stone-light)', fontFamily:'var(--ff-sans)', marginBottom:16 }}>
            Trusted by
          </div>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'center' }}>
            {['Maison Kala','Velour Co.','Studio Nord','Azar Jewels','Nomad Mag'].map(b => (
              <span key={b} style={{ fontFamily:'var(--ff-display)', fontStyle:'italic', fontSize:'.95rem', color:'var(--stone)', opacity:.55 }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right: Form */}
      <motion.div
        initial={{ opacity:0, x:50 }}
        animate={inView ? {opacity:1,x:0} : {}}
        transition={{ duration:1, delay:.15, ease }}
      >
        {sent ? (
          <div style={{
            height:'100%', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', textAlign:'center',
            padding:'60px 40px', background:'var(--rose-pale)',
          }}>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:'3.5rem', fontStyle:'italic', color:'var(--rose-dark)', marginBottom:16 }}>
              Thank you.
            </div>
            <p style={{ fontSize:'.9rem', color:'var(--stone)', lineHeight:1.8, maxWidth:340 }}>
              Your message has been received. I'll be in touch within 24 hours to begin our conversation.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label>Your Name</label>
                <input type="text" placeholder="Layla Ahmadi" required
                  value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="field">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" required
                  value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Session Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)}>
                {['Fashion & Editorial','Fine Art Portrait','Product & Brand','Creative Direction','Film & Motion','Workshop','Other'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Tell Me About Your Project</label>
              <textarea rows={6} placeholder="Share your vision, timeline, and any details that feel important..."
                value={form.message} onChange={e => update('message', e.target.value)} />
            </div>

            <button type="submit" className="btn-dark"
              style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center', cursor:'none' }}
              disabled={busy}>
              {busy ? 'Sending...' : <><span>Send Message</span><Send size={14}/></>}
            </button>

            <p style={{ fontSize:'.65rem', color:'var(--stone-light)', letterSpacing:'.08em', fontFamily:'var(--ff-sans)' }}>
              Your details are kept private and never shared with third parties.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  )
}
