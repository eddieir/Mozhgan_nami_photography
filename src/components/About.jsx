import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

// Persian-inspired SVG ornament
function Ornament() {
  return (
    <div className="ornament">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" stroke="#c4897b" strokeWidth=".8" />
        <rect x="25" y="25" width="50" height="50" stroke="#c4897b" strokeWidth=".5" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="12" stroke="#c4897b" strokeWidth=".8" fill="none" />
        <circle cx="50" cy="50" r="3" fill="#c4897b" opacity=".5" />
        {[0,90,180,270].map(a => (
          <line key={a}
            x1="50" y1="38" x2="50" y2="28"
            stroke="#c4897b" strokeWidth=".6"
            transform={`rotate(${a} 50 50)`} opacity=".6"
          />
        ))}
      </svg>
    </div>
  )
}

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const photos = [
    'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
  ]

  return (
    <section id="about" className="about" ref={ref}>
      {/* Images */}
      <motion.div
        className="about-images"
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration: 1.1, ease }}
      >
        {photos.map((src, i) => (
          <div key={i} className="ab-img">
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
        <Ornament />
      </motion.div>

      {/* Text */}
      <motion.div
        className="about-text"
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration: 1.1, delay: 0.15, ease }}
      >
        <div className="sec-label">About Mozhgan</div>
        <h2 className="sec-title">Where Every Frame<br />Tells a <em>Story</em></h2>

        <p className="about-intro">
          "I believe photography is the most intimate form of dialogue
          between two souls — the photographer and the subject."
        </p>

        <p className="about-body">
          Based between Tehran and Paris, Mozhgan Nami is a fine-art photographer
          whose work sits at the intersection of fashion, emotion, and cultural
          identity. With over a decade of experience working with leading brands,
          magazines, and independent artists, her images are distinguished by their
          warmth, depth, and painterly quality.
        </p>
        <p className="about-body">
          Trained in classical photography and visual arts, Mozhgan draws on
          Persian aesthetic traditions — pattern, light, and the poetry of
          negative space — to create work that feels both timeless and distinctly
          contemporary.
        </p>

        <div className="about-sig">Mozhgan Nami</div>

        <div className="about-stats">
          {[['250+','Projects'],['40+','Brands'],['15','Years'],['8','Awards']].map(([n,l]) => (
            <div key={l}>
              <div className="stat-n">{n}</div>
              <div className="stat-l">{l}</div>
            </div>
          ))}
        </div>

        <a href="#contact" className="btn-dark" style={{ marginTop: 8, display:'inline-block' }}>
          Work Together
        </a>
      </motion.div>
    </section>
  )
}
