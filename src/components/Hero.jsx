import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

// Slides for the hero right panel
const SLIDES = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=85',
    tag: 'Fashion Portrait',
    num: '01',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85',
    tag: 'Editorial',
    num: '02',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85',
    tag: 'Couture',
    num: '03',
  },
]

export default function Hero() {
  const [idx, setIdx]     = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRef          = useRef(null)

  // Auto-advance slides
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[idx]

  const easing = [0.25, 0.46, 0.45, 0.94]

  return (
    <section className="hero">
      {/* ── Left panel ── */}
      <div className="hero-left">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easing }}
        >
          <div className="hero-kicker">Fine Art Photography</div>

          <h1 className="hero-headline">
            The Soul
            <em>Captured</em>
            in Light
          </h1>

          <p className="hero-sub">
            Mozhgan Nami creates photographs that breathe —&nbsp;
            intimate portraits, bold fashion editorials, and
            product imagery that transcends the ordinary.
          </p>

          <div className="hero-actions">
            <a href="#work"    className="btn-dark">View Portfolio</a>
            <a href="#contact" className="btn-outline">Book a Session</a>
          </div>

          <div className="hero-scroll-hint">
            <div className="scroll-bar" />
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>

      {/* ── Right panel ── */}
      <div className="hero-right">
        {SLIDES.map((s, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
          >
            <img src={s.src} alt={s.tag} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'saturate(.82)' }} />
          </motion.div>
        ))}

        <div className="hero-tag">{slide.tag}</div>
        <div className="hero-counter">{slide.num}</div>

        {/* Slide dots */}
        <div style={{
          position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
          display:'flex', gap:8,
        }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                width: i===idx ? 24 : 8, height: 8,
                background: i===idx ? 'var(--white)' : 'rgba(255,255,255,.35)',
                border:'none', cursor:'none', transition:'all .4s ease',
                borderRadius: 4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
