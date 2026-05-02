import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const IMGS = [
  { cat:'Fashion',   title:'Couture Noir',     sub:'Milan 2024',  src:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80' },
  { cat:'Portrait',  title:'Golden Hour',      sub:'Turin 2024',  src:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&q=80' },
  { cat:'Editorial', title:'Urban Silence',    sub:'Paris 2023',  src:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' },
  { cat:'Fashion',   title:'Desert Bloom',     sub:'Turin 2024',  src:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80' },
  { cat:'Bridal',    title:'Soft Architecture',sub:'Milan 2024',  src:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80' },
  { cat:'Campaign',  title:'Essence No.5',     sub:'Studio 2024', src:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80' },
]

const GRID = [
  { col:'1/6',  h: 500 },
  { col:'6/9',  h: 500 },
  { col:'9/13', h: 500 },
  { col:'1/4',  h: 360 },
  { col:'4/8',  h: 360 },
  { col:'8/13', h: 360 },
]

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce

  return (
    <section id="work" className="work-section" ref={ref}>
      <motion.div className="work-header"
        initial={{ opacity:0, y:40 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div>
          <div className="s-eyebrow">Portfolio</div>
          <h2 className="s-title">Selected Work</h2>
        </div>
        <a href="#contact" className="work-see-all">Start a Project →</a>
      </motion.div>

      <motion.div className="port-grid"
        initial={{ opacity:0 }} animate={show?{opacity:1}:{}}
        transition={{ duration:.6, delay:.1 }}>
        {IMGS.map((img, i) => (
          <motion.div key={img.src} className="port-item"
            initial={{ opacity:0, scale:.97 }} animate={show?{opacity:1,scale:1}:{}}
            transition={{ duration:.65, delay:.08+i*.09, ease }}
            style={{ gridColumn: GRID[i].col, height: GRID[i].h }}>
            <img src={img.src} alt={img.title}/>
            <div className="port-caption">
              <div className="port-cat">{img.cat}</div>
              <div className="port-title">{img.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
