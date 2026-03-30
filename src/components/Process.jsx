import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

const STEPS = [
  { n:'01', title:'Discovery Call',         desc:'We begin with a relaxed conversation — your vision, the mood, the story you want to tell. No brief is too ambitious.' },
  { n:'02', title:'Creative Concept',       desc:'I develop a bespoke concept: references, colour palette, location scouting, wardrobe direction, and a detailed shot list.' },
  { n:'03', title:'The Shoot',              desc:'The session itself — collaborative, intentional, and unhurried. My approach puts every subject at ease to reveal their most authentic self.' },
  { n:'04', title:'Curation & Editing',     desc:'I personally select and retouch every image to ensure cinematic tones, flawless skin, and a timeless finish consistent with your brief.' },
  { n:'05', title:'Delivery & Licensing',   desc:'Your gallery is delivered via a private online portal. We finalise usage rights, print editions, and archival files together.' },
]

export default function Process() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="process" className="process" ref={ref}>
      <div className="process-inner">
        {/* Left: text + steps */}
        <motion.div
          initial={{ opacity:0, x:-50 }}
          animate={inView ? {opacity:1,x:0} : {}}
          transition={{ duration:1, ease }}
        >
          <div className="sec-label">How It Works</div>
          <h2 className="sec-title">The Creative<br /><em>Process</em></h2>
          <p style={{ fontSize:'.9rem', color:'var(--stone)', lineHeight:1.9, marginTop:24, maxWidth:480 }}>
            Every project is approached as a unique collaboration.
            From first conversation to final delivery, the process is
            thoughtful, transparent, and crafted around your goals.
          </p>

          <div className="process-steps">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                className="p-step"
                initial={{ opacity:0, x:-30 }}
                animate={inView ? {opacity:1,x:0} : {}}
                transition={{ duration:.7, delay:.15 + i*.1, ease }}
              >
                <div className="p-step-n">{s.n}</div>
                <div>
                  <div className="p-step-title">{s.title}</div>
                  <p className="p-step-desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          className="process-image"
          initial={{ opacity:0, x:50 }}
          animate={inView ? {opacity:1,x:0} : {}}
          transition={{ duration:1, delay:.2, ease }}
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
            alt="Behind the lens"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
