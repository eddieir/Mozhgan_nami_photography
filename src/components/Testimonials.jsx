import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const TESTIS = [
  {
    quote: "A calm, guided experience from concept to final delivery. Every detail considered, every image intentional.",
    role: "Bridal Client, Turin",
  },
  {
    quote: "The images went beyond what I expected. A genuine collaboration with a true eye for light and emotion.",
    role: "Portrait Session, Milan",
  },
  {
    quote: "Our campaign reached a completely new audience. The visual storytelling was exactly what the brand needed.",
    role: "Brand Campaign, 2024",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce

  return (
    <section className="testi-section" ref={ref}>
      <motion.div
        initial={{ opacity:0, y:40 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div className="s-eyebrow" style={{ textAlign:'center' }}>Client Words</div>
        <h2 className="s-title" style={{ textAlign:'center' }}>The Experience</h2>
      </motion.div>

      <div className="testi-grid">
        {TESTIS.map((t, i) => (
          <motion.div key={i} className="testi-card"
            initial={{ opacity:0, y:30 }} animate={show?{opacity:1,y:0}:{}}
            transition={{ duration:.7, delay:.12+i*.14, ease }}>
            <p className="testi-text">{t.quote}</p>
            <div className="testi-role">{t.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
