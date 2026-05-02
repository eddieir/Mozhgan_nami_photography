import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
const ease = [0.25,0.46,0.45,0.94]
const SKILLS = ['Bridal Photography', 'Fashion Editorial', 'Portrait Sessions', 'Film & Reels', 'Brand Campaigns', 'Creative Direction']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce
  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div className="about-media"
        initial={{ opacity:0, x:-60 }} animate={show?{opacity:1,x:0}:{}}
        transition={{ duration:1, ease }}>
        <img className="about-img-main"
          src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=80"
          alt="Mozhgan Nami at work"/>
        <img className="about-img-small"
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"
          alt="Camera"/>
        <div className="about-badge">
          <span className="about-badge-n">15+</span>
          <span className="about-badge-l">Years of Art</span>
        </div>
      </motion.div>

      <motion.div className="about-text"
        initial={{ opacity:0, x:60 }} animate={show?{opacity:1,x:0}:{}}
        transition={{ duration:1, delay:.15, ease }}>
        <div className="s-eyebrow">About the Artist</div>
        <h2 className="s-title">Every Frame<br/>Tells a Story</h2>
        <div className="divider"/>
        <p className="about-body">
          Mozhgan Nami is a photographer and filmmaker based in Turin, Italy, creating editorial, bridal, portrait, and brand visuals with a cinematic eye.
        </p>
        <p className="about-body">
          Her work focuses on emotion, light, movement, and refined visual storytelling — designed for couples, creatives, and brands who want imagery with atmosphere and intention.
        </p>
        <p className="about-body">
          Available in Italy and worldwide for commissions, collaborations, and long-term creative partnerships.
        </p>
        <div className="about-signature">Mozhgan Nami</div>
        <div className="about-skills">
          {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
        </div>
        <div style={{ marginTop:36, display:'flex', gap:12 }}>
          <a href="#contact" className="btn-gold">Book a Session</a>
          <a href="#work" className="btn-ghost">View Portfolio</a>
        </div>
      </motion.div>
    </section>
  )
}
