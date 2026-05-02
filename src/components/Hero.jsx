import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SLIDES = [
  { src:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=85', tag:'Couture' },
  { src:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=85', tag:'Portrait' },
  { src:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85', tag:'Editorial' },
]

const STATS = [
  ['250+','Projects completed'],
  ['40+', 'Clients worldwide'],
  ['15+', 'Years of practice'],
  ['8',   'Awards received'],
]

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5200)
    return () => clearInterval(t)
  }, [])

  const reveal = (delay = 0) => ({
    initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduce ? 0 : 1.3,
      delay: shouldReduce ? 0 : delay,
      ease,
    },
  })

  return (
    <>
      <section className="hero">
        {/* Background carousel */}
        <div className="hero-video-wrap">
          {SLIDES.map((s, i) => (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: i === idx ? 1 : 0,
              transition: shouldReduce ? 'none' : 'opacity 1.6s cubic-bezier(.4,0,.2,1)',
            }}>
              <img
                src={s.src}
                alt={s.tag}
                style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.38) saturate(.75)' }}
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay"/>

        {/* Main content — staggered cinematic reveal */}
        <div className="hero-content">
          <motion.div className="hero-tag-line" {...reveal(0.25)}>
            Photography · Film · Turin, Italy
          </motion.div>

          <motion.h1 className="hero-title" {...reveal(0.5)}>
            Capturing light
          </motion.h1>

          <motion.span className="hero-title-italic" {...reveal(0.72)}>
            &amp; Vision.
          </motion.span>

          <motion.p className="hero-desc" {...reveal(1.0)}>
            Mozhgan Nami creates photographs and films that breathe — intimate
            portraits, bold fashion editorials, and cinematic imagery.
            Based in Turin, Italy. Available worldwide.
          </motion.p>

          <motion.div className="hero-btns" {...reveal(1.22)}>
            <a href="#work" className="btn-gold">View Portfolio</a>
            <a href="#contact" className="btn-ghost">Book a Session</a>
          </motion.div>
        </div>

        {/* Slide dots */}
        <div style={{
          position: 'absolute', bottom: 36, right: 60, zIndex: 3,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 28 : 6, height: 1,
                background: i === idx ? 'var(--white)' : 'rgba(255,255,255,.22)',
                border: 'none', cursor: 'none',
                transition: shouldReduce ? 'none' : 'all .5s cubic-bezier(.4,0,.2,1)',
                padding: 0,
              }}/>
          ))}
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* Stats bar */}
      <div className="hero-stats">
        {STATS.map(([n, l]) => (
          <div key={l} className="hstat">
            <div className="hstat-n">{n}</div>
            <div className="hstat-l">{l}</div>
          </div>
        ))}
      </div>
    </>
  )
}
