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
          Based in Turin, Italy, Mozhgan Nami is a fine-art photographer and filmmaker
          whose work sits at the intersection of fashion, emotion, and cultural identity.
          With over a decade of experience working with leading brands, magazines, and
          independent artists, her images are distinguished by their warmth, depth, and
          painterly quality.
        </p>
        <p className="about-body">
          Trained in classical photography and visual arts, Mozhgan draws on Italian
          and Persian aesthetic traditions — pattern, light, and the poetry of negative
          space — to create work that feels both timeless and distinctly contemporary.
          Available worldwide for commissions and collaborations.
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
