import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
const ease = [0.25,0.46,0.45,0.94]
const STEPS = [
  { n:'01', title:'Discovery Call',        desc:'A relaxed conversation about your vision, mood, and story. No brief is too ambitious or too intimate.' },
  { n:'02', title:'Creative Concept',      desc:'A bespoke concept: references, colour palette, location scouting, wardrobe direction, and a detailed shot list.' },
  { n:'03', title:'The Shoot',             desc:'Collaborative, intentional, and unhurried. My approach puts every subject at ease to reveal their most authentic self.' },
  { n:'04', title:'Curation & Editing',    desc:'I personally select and retouch every image — cinematic tones, meticulous retouching, a timeless and consistent finish.' },
  { n:'05', title:'Delivery & Licensing',  desc:'Your private gallery delivered within 7 days. Usage rights, print editions, and archival files finalised together.' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <section id="process" className="process-section" ref={ref}>
      <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.9, ease }}>
        <div className="s-eyebrow">How It Works</div>
        <h2 className="s-title">The Creative</h2>
        <span className="s-title-italic">Process</span>
      </motion.div>
      <div className="process-grid">
        <motion.div initial={{ opacity:0, x:-50 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:1, delay:.1, ease }}>
          <p style={{ fontSize:'.85rem', fontWeight:300, lineHeight:1.9, color:'var(--grey1)', maxWidth:480, marginBottom:40 }}>
            Every project is a unique collaboration. From first conversation to
            final delivery, the process is thoughtful, transparent, and built
            entirely around your goals and vision.
          </p>
          <div className="process-steps">
            {STEPS.map((s,i) => (
              <motion.div key={s.n} className="pstep"
                initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}}
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
          initial={{ opacity:0, x:50 }} animate={inView?{opacity:1,x:0}:{}}
          transition={{ duration:1, delay:.2, ease }}>
          <img className="process-img"
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
            alt="Behind the lens"/>
          <div className="process-img-line"/>
        </motion.div>
      </div>
    </section>
  )
}
