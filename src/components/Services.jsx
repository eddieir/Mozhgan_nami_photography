import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const SVCS = [
  {
    num: '01',
    name: 'Bridal & Couple Photography',
    desc: 'Elegant, emotional, and timeless imagery for intimate stories and wedding moments — from engagement sessions to full-day bridal coverage.',
    for: 'Ideal for couples planning their wedding, elopement, or engagement story.',
  },
  {
    num: '02',
    name: 'Editorial Portraits',
    desc: 'Cinematic portraits with a refined, fashion-inspired direction — for actors, artists, founders, and individuals who want intentional personal imagery.',
    for: 'Ideal for personal branding, press materials, and editorial features.',
  },
  {
    num: '03',
    name: 'Fashion & Brand Campaigns',
    desc: 'Visual campaigns for boutiques, designers, beauty, and lifestyle brands — built around identity, cohesion, and emotional impact.',
    for: 'Ideal for brands launching collections, campaigns, or visual identities.',
  },
  {
    num: '04',
    name: 'Film & Reels',
    desc: 'Short cinematic films and social-ready reels for events, campaigns, and personal brands — crafted with the same care as still photography.',
    for: 'Ideal for social media content, brand storytelling, and event films.',
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
              <p className="svc-row-for">{s.for}</p>
            </div>
            <a href="#contact" className="svc-row-cta">Enquire →</a>
          </motion.li>
        ))}
      </ul>

      <motion.div className="svc-cta"
        initial={{ opacity:0, y:20 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.8, delay:.5, ease }}>
        <p className="svc-cta-text">Have a project in mind?</p>
        <a href="#contact" className="btn-gold">Tell us about your project</a>
      </motion.div>
    </section>
  )
}
