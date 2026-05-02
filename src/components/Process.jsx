import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const STEPS = [
  {
    n: '01', title: 'Inquiry',
    desc: 'Share your date, location, and vision. A brief, relaxed conversation to understand your story and what you want to create together.',
  },
  {
    n: '02', title: 'Creative Direction',
    desc: 'We define the mood, styling, location, and references together — a clear visual direction before the shoot begins.',
  },
  {
    n: '03', title: 'Shoot Day',
    desc: 'A calm, guided experience with full attention to light, composition, and atmosphere. You relax — we take care of the rest.',
  },
  {
    n: '04', title: 'Editing & Delivery',
    desc: 'Your final gallery or film, carefully edited to a refined cinematic finish. Delivered privately within 7 to 14 days.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce

  return (
    <section id="process" className="process-section" ref={ref}>
      <motion.div
        initial={{ opacity:0, y:40 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div className="s-eyebrow">How It Works</div>
        <h2 className="s-title">The Creative Process</h2>
      </motion.div>

      <div className="process-grid">
        <motion.div
          initial={{ opacity:0, x:-50 }} animate={show?{opacity:1,x:0}:{}}
          transition={{ duration:1, delay:.1, ease }}>
          <p style={{ fontSize:'.85rem', fontWeight:300, lineHeight:1.9, color:'var(--grey1)', maxWidth:480, marginBottom:40 }}>
            Every project begins with a conversation and ends with imagery that feels right. The process is calm, collaborative, and built around your story.
          </p>
          <div className="process-steps">
            {STEPS.map((s,i) => (
              <motion.div key={s.n} className="pstep"
                initial={{ opacity:0, x:-30 }} animate={show?{opacity:1,x:0}:{}}
                transition={{ duration:.6, delay:.15+i*.1, ease }}>
                <div className="pstep-num">{s.n}</div>
                <div>
                  <div className="pstep-title">{s.title}</div>
                  <p className="pstep-desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="process-img-wrap"
          initial={{ opacity:0, x:50 }} animate={show?{opacity:1,x:0}:{}}
          transition={{ duration:1, delay:.2, ease }}>
          <img className="process-img"
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
            alt="Behind the lens"/>
          <div className="process-img-line"/>
        </motion.div>
      </div>

      <motion.div className="process-cta"
        initial={{ opacity:0, y:20 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.8, delay:.6, ease }}>
        <a href="#contact" className="btn-gold">Start Your Booking</a>
      </motion.div>
    </section>
  )
}
