import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
const ease = [0.25,0.46,0.45,0.94]

function IgIcon({ size=16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/></svg>
}
function WaIcon({ size=16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.073-1.118l-.292-.174-3.015.857.844-2.94-.19-.302A7.946 7.946 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/></svg>
}

const CLINKS = [
  { Icon: Mail,   href:'mailto:mozhgannamiseghinsara@gmail.com', label:'Email',     text:'mozhgannamiseghinsara@gmail.com' },
  { Icon: WaIcon, href:'https://wa.me/393515993144',             label:'WhatsApp',  text:'+39 351 599 3144' },
  { Icon: IgIcon, href:'https://www.instagram.com/mozhganphotography/', label:'Instagram', text:'@mozhganphotography' },
  
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce
  const [form, setForm] = useState({ name:'', contact:'', type:'Fashion & Editorial', message:'' })
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const upd = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const submit = e => {
    e.preventDefault(); setBusy(true)
    const sub = encodeURIComponent(`Photography Enquiry — ${form.type}`)
    const bod = encodeURIComponent(`Name: ${form.name}\nContact: ${form.contact}\nType: ${form.type}\n\n${form.message}`)
    window.open(`mailto:mozhgannamiseghinsara@gmail.com?subject=${sub}&body=${bod}`)
    setTimeout(() => { setSent(true); setBusy(false) }, 800)
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <motion.div className="contact-left"
        initial={{ opacity:0, x:-50 }} animate={show?{opacity:1,x:0}:{}}
        transition={{ duration:1, ease }}>
        <div className="s-eyebrow">Get In Touch</div>
        <h2 className="s-title">Let's Create Your Visual Story</h2>
        <p className="contact-body">
          Based in Turin, Italy — available worldwide for commissions, campaigns,
          and collaborations. Reach out via email, WhatsApp, or Instagram.
          I respond within 24 hours.
        </p>
        {CLINKS.map(({ Icon, href, label, text }) => (
          <a key={label} href={href} className="clink"
            target={href.startsWith('http')?'_blank':undefined}
            rel={href.startsWith('http')?'noopener noreferrer':undefined}>
            <span className="clink-icon"><Icon size={16}/></span>
            <span>
              <div className="clink-label">{label}</div>
              <div className="clink-val">{text}</div>
            </span>
          </a>
        ))}
        <div className="cta-social">
          <a href="https://wa.me/393515993144" target="_blank" rel="noopener noreferrer"
            className="social-btn social-btn-wa">
            <WaIcon size={14}/> WhatsApp
          </a>
          <a href="https://www.instagram.com/mozhganphotography/" target="_blank" rel="noopener noreferrer"
            className="social-btn social-btn-ig">
            <IgIcon size={14}/> Instagram
          </a>
        </div>
      </motion.div>

      <motion.div className="contact-right"
        initial={{ opacity:0, x:50 }} animate={show?{opacity:1,x:0}:{}}
        transition={{ duration:1, delay:.15, ease }}>
        {sent ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', textAlign:'center', padding:'40px 0' }}>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:'3rem', fontStyle:'italic', color:'var(--accent)', marginBottom:16 }}>Thank you.</div>
            <p style={{ fontSize:'.85rem', fontWeight:300, color:'var(--grey1)', lineHeight:1.8, maxWidth:320 }}>
              Your email client has opened with the message pre-filled. Send it and I'll be in touch within 24 hours.
            </p>
            <div style={{ display:'flex', gap:12, marginTop:28 }}>
              <a href="https://wa.me/393515993144" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display:'flex', alignItems:'center', gap:8, fontSize:'.6rem' }}><WaIcon size={13}/> WhatsApp</a>
              <button onClick={() => setSent(false)} className="btn-ghost" style={{ fontSize:'.6rem', cursor:'none' }}>Send Another</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:32 }}>
              <h3 style={{ fontFamily:'var(--ff-head)', fontSize:'1.2rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--white)', marginBottom:8 }}>Send an Enquiry</h3>
              <p style={{ fontSize:'.78rem', fontWeight:300, color:'var(--grey1)' }}>Fill out the form and I'll get back to you within 24 hours.</p>
            </div>
            <form className="cform" onSubmit={submit}>
              <div className="cform-row">
                <div className="cfield">
                  <label>Your Name</label>
                  <input type="text" placeholder="Sofia Rossi" required value={form.name} onChange={e => upd('name',e.target.value)}/>
                </div>
                <div className="cfield">
                  <label>Email or WhatsApp</label>
                  <input type="text" placeholder="you@email.com" required value={form.contact} onChange={e => upd('contact',e.target.value)}/>
                </div>
              </div>
              <div className="cfield">
                <label>Session Type</label>
                <select value={form.type} onChange={e => upd('type',e.target.value)}>
                  {['Fashion & Editorial','Fine Art Portrait','Product & Brand','Creative Direction','Film & Motion','Workshop','Other'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="cfield">
                <label>Your Message</label>
                <textarea rows={5} placeholder="Tell me about your project, timeline, and vision..."
                  value={form.message} onChange={e => upd('message',e.target.value)}/>
              </div>
              <button type="submit" className="btn-gold"
                style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'center', cursor:'none', border:'none' }}
                disabled={busy}>
                {busy ? 'Opening...' : <><span>Send Enquiry</span><Send size={14}/></>}
              </button>
              <p style={{ fontSize:'.6rem', fontWeight:300, color:'var(--grey2)', letterSpacing:'.04em', lineHeight:1.6 }}>
                This opens your email client pre-filled to mozhgannamiseghinsara@gmail.com.
                You can also reach out directly via WhatsApp or Instagram DM.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </section>
  )
}
