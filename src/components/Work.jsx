import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

const CATEGORIES = ['All', 'Fashion', 'Portrait', 'Product', 'Editorial']

const IMAGES = [
  { cat:'Fashion',   label:'Couture Noir',      src:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80' },
  { cat:'Portrait',  label:'Golden Hour',       src:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&q=80' },
  { cat:'Editorial', label:'Urban Silence',     src:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' },
  { cat:'Fashion',   label:'Desert Bloom',      src:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80' },
  { cat:'Product',   label:'Essence No.5',      src:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80' },
  { cat:'Portrait',  label:'Soft Architecture', src:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80' },
]

export default function Work() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? IMAGES : IMAGES.filter(i => i.cat === active)

  return (
    <section id="work" className="work" ref={ref}>
      <motion.div
        className="work-head"
        initial={{ opacity:0, y:40 }}
        animate={inView ? {opacity:1,y:0} : {}}
        transition={{ duration:.9, ease }}
      >
        <div>
          <div className="sec-label">Portfolio</div>
          <h2 className="sec-title">Selected <em>Work</em></h2>
        </div>
        <p className="work-desc">
          A curated selection spanning fashion, portraiture, product,
          and editorial — each image a collaboration of vision and trust.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="work-tabs"
        initial={{ opacity:0 }}
        animate={inView ? {opacity:1} : {}}
        transition={{ duration:.8, delay:.2, ease }}
      >
        {CATEGORIES.map(c => (
          <button key={c} className={`tab-btn ${active===c?'active':''}`}
            onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </motion.div>

      {/* Gallery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="gallery-grid"
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0 }}
          transition={{ duration:.5, ease }}
        >
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              className="g-item"
              initial={{ opacity:0, scale:.97 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:.6, delay: i*.08, ease }}
              style={{
                gridColumn: i===0?'1/6': i===1?'6/9': i===2?'9/13':
                            i===3?'1/5': i===4?'5/9': '9/13',
                height: i<3 ? 420 : 320,
              }}
            >
              <img src={img.src} alt={img.label} loading="lazy" />
              <div className="g-hover">
                <span className="g-label">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity:0 }}
        animate={inView ? {opacity:1} : {}}
        transition={{ duration:.8, delay:.5 }}
        style={{ textAlign:'center', marginTop:56 }}
      >
        <a href="#contact" className="btn-outline">Enquire About a Project</a>
      </motion.div>
    </section>
  )
}
