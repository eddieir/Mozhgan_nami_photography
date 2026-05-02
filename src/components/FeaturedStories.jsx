import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25,0.46,0.45,0.94]

const STORIES = [
  {
    num: '01',
    cat: 'Fashion Editorial',
    title: 'Couture Noir',
    loc: 'Milan, 2024',
    desc: 'A bold exploration of shadow and silhouette — three days in Milan\'s most iconic spaces, capturing the tension between haute couture and raw architecture.',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85',
  },
  {
    num: '02',
    cat: 'Bridal & Couple',
    title: 'Golden Hour',
    loc: 'Tuscany, 2024',
    desc: 'An intimate bridal portrait series shot in the last light of a Tuscan evening. Each frame carries the weight of a beautiful beginning.',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85',
  },
  {
    num: '03',
    cat: 'Brand Campaign',
    title: 'Desert Bloom',
    loc: 'Studio, Turin 2024',
    desc: 'A campaign that transforms product into poetry — clean forms against saturated environments, inviting a second glance.',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85',
  },
]

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
          <div className="s-eyebrow">Featured Work</div>
          <h2 className="s-title">Highlighted Stories</h2>
        </div>
        <p className="stories-intro">
          A curated selection of editorial projects, intimate sessions, and brand campaigns —
          each with its own visual language and emotional register.
        </p>
      </motion.div>

      <motion.div className="story-featured"
        initial={{ opacity:0, y:50 }} animate={show?{opacity:1,y:0}:{}}
        transition={{ duration:.9, delay:.1, ease }}>
        <div className="story-img-wrap story-img-lg">
          <img src={STORIES[0].src} alt={STORIES[0].title}/>
        </div>
        <div className="story-caption story-caption-lg">
          <div className="story-meta">
            <span className="story-num">{STORIES[0].num}</span>
            <span className="story-cat">{STORIES[0].cat}</span>
          </div>
          <h3 className="story-title">{STORIES[0].title}</h3>
          <div className="story-loc">{STORIES[0].loc}</div>
          <p className="story-desc">{STORIES[0].desc}</p>
          <a href="#contact" className="story-cta">Enquire about this project <span>→</span></a>
        </div>
      </motion.div>

      <div className="stories-sm-grid">
        {STORIES.slice(1).map((s,i) => (
          <motion.div key={s.num} className="story-item"
            initial={{ opacity:0, y:40 }} animate={show?{opacity:1,y:0}:{}}
            transition={{ duration:.8, delay:.22+i*.12, ease }}>
            <div className="story-img-wrap story-img-sm">
              <img src={s.src} alt={s.title}/>
            </div>
            <div className="story-caption">
              <div className="story-meta">
                <span className="story-num">{s.num}</span>
                <span className="story-cat">{s.cat}</span>
              </div>
              <h3 className="story-title story-title-sm">{s.title}</h3>
              <div className="story-loc">{s.loc}</div>
              <p className="story-desc">{s.desc}</p>
              <a href="#contact" className="story-cta">Enquire <span>→</span></a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
