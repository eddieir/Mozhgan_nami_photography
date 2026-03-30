import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SLIDES = [
  { src:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=85', tag:'Couture' },
  { src:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=85', tag:'Portrait' },
  { src:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85', tag:'Editorial' },
]
const ease = [0.25,0.46,0.45,0.94]

const STATS = [
  ['250+','Projects Done'],['40+','Happy Clients'],['15+','Years Experience'],['8','Awards Won']
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-video-wrap">
          {SLIDES.map((s,i) => (
            <div key={i} style={{
              position:'absolute', inset:0,
              opacity: i===idx ? 1 : 0,
              transition:'opacity 1.4s ease',
            }}>
              <img src={s.src} alt={s.tag} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.45) saturate(.8)' }}/>
            </div>
          ))}
        </div>
        <div className="hero-overlay"/>

        <motion.div className="hero-content"
          initial={{ opacity:0, y:60 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, delay:.3, ease }}>
          <div className="hero-tag-line">Fine Art Photography & Film</div>
          <h1 className="hero-title">Capturing<br/>Light</h1>
          <span className="hero-title-italic">& Vision</span>
          <p className="hero-desc">
            Mozhgan Nami creates photographs and films that breathe — intimate
            portraits, bold fashion editorials, and cinematic product imagery.
            Based in Turin, Italy. Available worldwide.
          </p>
          <div className="hero-btns">
            <a href="#work" className="btn-gold">View Portfolio</a>
            <a href="#contact" className="btn-ghost">Book a Session</a>
          </div>
        </motion.div>

        {/* Slide dots */}
        <div style={{
          position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
          display:'flex', gap:8, zIndex:3,
        }}>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                width: i===idx ? 28 : 8, height:8,
                background: i===idx ? 'var(--accent)' : 'rgba(255,255,255,.25)',
                border:'none', cursor:'none', transition:'all .4s', borderRadius:4,
              }}/>
          ))}
        </div>

        {/* Slide tag */}
        <div style={{
          position:'absolute', top:110, right:0, zIndex:3,
          background:'var(--accent)', color:'var(--black)',
          fontFamily:'var(--ff-head)', fontSize:'.55rem', fontWeight:700,
          letterSpacing:'.22em', textTransform:'uppercase', padding:'10px 18px',
        }}>
          {SLIDES[idx].tag}
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* Stats bar */}
      <div className="hero-stats">
        {STATS.map(([n,l]) => (
          <div key={l} className="hstat">
            <div className="hstat-n">{n}</div>
            <div className="hstat-l">{l}</div>
          </div>
        ))}
      </div>
    </>
  )
}
