import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const SVCS = [
  {
    num: '01', name: 'Photography',
    desc: 'Fine art portraits, personal sessions, and intimate editorial work. Every image is crafted with patience, natural light, and an eye for the authentic moment.',
  },
  {
    num: '02', name: 'Film & Reels',
    desc: 'Cinematic brand films, campaign videos, and social reels. Seamlessly blending still photography with moving image to create richer, more compelling narratives.',
  },
  {
    num: '03', name: 'Bridal & Couple',
    desc: 'Timeless, emotional bridal portraits and couple sessions. From intimate elopements to grand celebrations — every love story deserves its own visual language.',
  },
  {
    num: '04', name: 'Fashion Editorial',
    desc: 'High-concept fashion campaigns and editorial shoots for luxury brands and magazines. Bold styling, precise lighting, and a fearless creative vision.',
  },
  {
    num: '05', name: 'Brand Campaigns',
    desc: 'Visual storytelling for brands that demand more than beautiful images — cohesive campaigns built around strategy, identity, and lasting emotional resonance.',
  },
  {
    num: '06', name: 'Creative Direction',
    desc: 'End-to-end creative consultation — concept development, mood-boarding, casting, and art direction for brands and artists who need a complete visual identity.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce

  return (
    <section id="services" className="services-section services-light" ref={ref}>
      <motion.div className="services-header"
        initial={{ opacity:0, y:40 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div>
          <div className="s-eyebrow">What I Offer</div>
          <h2 className="s-title">Expertise</h2>
        </div>
        <p className="services-header-desc">
          Every project is approached with full creative commitment — from concept
          to final delivery, each image meticulously crafted to tell your story.
        </p>
      </motion.div>

      <ul className="svc-list">
        {SVCS.map((s, i) => (
          <motion.li key={s.num} className="svc-row"
            initial={{ opacity:0, y:16 }} animate={show?{opacity:1,y:0}:{}}
            transition={{ duration:.6, delay:.1+i*.08, ease }}>
            <span className="svc-row-num">{s.num}</span>
            <div className="svc-row-body">
              <div className="svc-row-name">{s.name}</div>
              <p className="svc-row-desc">{s.desc}</p>
            </div>
            <a href="#contact" className="svc-row-cta">Enquire →</a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
