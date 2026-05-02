import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const STORY = {
  num: '01',
  cat: 'Fashion Editorial',
  title: 'Couture Noir',
  loc: 'Milan, 2024',
  desc: 'A bold exploration of shadow and silhouette — three days in Milan\'s most iconic spaces, capturing the tension between haute couture and raw architecture.',
  src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85',
}

export default function FeaturedStories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const show = inView || shouldReduce

  return (
    <section id="stories" className="stories-section" ref={ref}>
      <motion.div className="stories-header"
        initial={{ opacity:0, y:40 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div>
          <div className="s-eyebrow">Editorial Feature</div>
          <h2 className="s-title">A visual language of softness,<br/>movement, and quiet elegance.</h2>
        </div>
      </motion.div>

      <motion.div className="story-featured"
        initial={{ opacity:0, y:50 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, delay:.1, ease }}>
        <div className="story-img-wrap story-img-lg">
          <img src={STORY.src} alt={STORY.title}/>
        </div>
        <div className="story-caption story-caption-lg">
          <div className="story-meta">
            <span className="story-num">{STORY.num}</span>
            <span className="story-cat">{STORY.cat}</span>
          </div>
          <h3 className="story-title">{STORY.title}</h3>
          <div className="story-loc">{STORY.loc}</div>
          <p className="story-desc">{STORY.desc}</p>
          <a href="#contact" className="story-cta">Enquire about this project <span>→</span></a>
        </div>
      </motion.div>
    </section>
  )
}
