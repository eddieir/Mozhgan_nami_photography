import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
const ease = [0.25,0.46,0.45,0.94]
const SKILLS = ['Fashion Photography','Portrait Sessions','Product Photography','Creative Direction','Video & Film','Editorial Work','Post-Production','Art Direction']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div className="about-media"
        initial={{ opacity:0, x:-60 }} animate={inView?{opacity:1,x:0}:{}}
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
        initial={{ opacity:0, x:60 }} animate={inView?{opacity:1,x:0}:{}}
        transition={{ duration:1, delay:.15, ease }}>
        <div className="s-eyebrow">About the Artist</div>
        <h2 className="s-title">Where Every<br/>Frame Tells a</h2>
        <span className="s-title-italic">Story</span>
        <div className="divider"/>
        <p className="about-body">
        Mozhgan Photography is a creative photography studio dedicated to capturing authentic moments, emotions, and stories through a refined artistic lens. With a passion for visual storytelling, Mozhgan transforms everyday moments into timeless memories that reflect beauty, personality, and connection.
        Specializing in portrait, lifestyle, and event photography, the brand focuses on creating a comfortable and inspiring experience for every client. Each session is thoughtfully designed to highlight natural expressions and genuine emotions, resulting in images that feel both elegant and real.
        </p>
        <p className="about-body">
        Driven by creativity and attention to detail, Mozhgan Photography blends modern aesthetics with a personal approach—ensuring every photo tells a unique story. 
        Whether it’s a personal shoot, a special celebration, or creative content for brands, the goal is always the same: to create meaningful visuals that last a lifetime.
        </p>
        <div className="about-signature">Mozhgan Nami</div>
        <div className="about-skills">
          {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
        </div>
        <div style={{ marginTop:36, display:'flex', gap:12 }}>
          <a href="#contact" className="btn-gold">Work Together</a>
          <a href="#work" className="btn-ghost">View Portfolio</a>
        </div>
      </motion.div>
    </section>
  )
}
