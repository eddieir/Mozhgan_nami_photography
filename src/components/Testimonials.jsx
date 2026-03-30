import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

const TESTIMONIALS = [
  {
    quote: "Working with Mozhgan was transformative. She saw something in our brand that we had struggled to articulate, and then made it visible. The images exceeded every expectation.",
    name:  "Layla Ahmadi",
    role:  "Creative Director, Maison Kala",
  },
  {
    quote: "I've never felt so at ease in front of a camera. Mozhgan creates a space of total trust. The portraits she made are the most honest images I have of myself.",
    name:  "Soren Lindqvist",
    role:  "Actor & Author",
  },
  {
    quote: "Our autumn campaign reached 3x normal engagement. The photographs weren't just beautiful — they told the exact story we needed to tell at exactly the right moment.",
    name:  "Priya Mehta",
    role:  "Head of Marketing, Velour Co.",
  },
]

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="testimonials" ref={ref}>
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={inView ? {opacity:1,y:0} : {}}
        transition={{ duration:.9, ease }}
      >
        <div className="sec-label" style={{ justifyContent:'center' }}>
          <span style={{ width:28, height:1, background:'var(--rose)', display:'block' }} />
          Client Words
        </div>
        <h2 className="sec-title">What Clients <em>Say</em></h2>
      </motion.div>

      <div className="testi-grid">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            className="testi-card"
            initial={{ opacity:0, y:30 }}
            animate={inView ? {opacity:1,y:0} : {}}
            transition={{ duration:.7, delay:.1 + i*.12, ease }}
          >
            <p className="testi-quote">{t.quote}</p>
            <div className="testi-name">{t.name}</div>
            <div className="testi-role">{t.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
