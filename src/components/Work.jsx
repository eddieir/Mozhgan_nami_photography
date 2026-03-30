import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
const ease = [0.25,0.46,0.45,0.94]
const CATS = ['All','Fashion','Portrait','Product','Editorial']
const IMGS = [
  { cat:'Fashion',   title:'Couture Noir',      sub:'Milan 2024', src:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80' },
  { cat:'Portrait',  title:'Golden Hour',        sub:'Turin 2024', src:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&q=80' },
  { cat:'Editorial', title:'Urban Silence',      sub:'Paris 2023', src:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' },
  { cat:'Fashion',   title:'Desert Bloom',       sub:'Turin 2024', src:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80' },
  { cat:'Product',   title:'Essence No.5',       sub:'Studio 2024',src:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80' },
  { cat:'Portrait',  title:'Soft Architecture',  sub:'Milan 2024', src:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80' },
]

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? IMGS : IMGS.filter(i => i.cat === active)

  return (
    <section id="work" className="work-section" ref={ref}>
      <motion.div className="work-header"
        initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div>
          <div className="s-eyebrow">Portfolio</div>
          <h2 className="s-title">Selected</h2>
          <span className="s-title-italic">Work</span>
        </div>
        <a href="#contact" className="btn-gold" style={{ alignSelf:'flex-end' }}>
          Start a Project
        </a>
      </motion.div>

      <motion.div className="work-tabs"
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
        transition={{ duration:.8, delay:.2 }}>
        {CATS.map(c => (
          <button key={c} className={`wtab ${active===c?'on':''}`}
            onClick={() => setActive(c)}>{c}</button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={active} className="port-grid"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:.4 }}>
          {filtered.map((img,i) => (
            <motion.div key={img.src} className="port-item"
              initial={{ opacity:0, scale:.97 }} animate={{ opacity:1, scale:1 }}
              transition={{ duration:.5, delay:i*.07, ease }}
              style={{
                gridColumn: i===0?'1/6': i===1?'6/9': i===2?'9/13':
                            i===3?'1/4': i===4?'4/8': '8/13',
                height: i<3 ? 440 : 300,
              }}>
              <img src={img.src} alt={img.title}/>
              <div className="port-caption">
                <div className="port-cat">{img.cat}</div>
                <div className="port-title">{img.title}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
