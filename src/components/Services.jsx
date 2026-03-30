import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94]

const SERVICES = [
  {
    num: '01',
    name: 'Fashion & Editorial',
    desc: 'High-concept fashion campaigns, magazine editorials, and lookbooks. From intimate studio sessions to large-scale location shoots — always with a distinct artistic point of view.',
  },
  {
    num: '02',
    name: 'Fine Art Portraiture',
    desc: 'Personal portraits that capture character, mood, and moment. Whether solo, couple, or family — every sitting is a collaborative, unhurried exploration of the authentic self.',
  },
  {
    num: '03',
    name: 'Product & Brand',
    desc: 'Still-life and product photography crafted to make objects extraordinary. Packaging, jewellery, cosmetics, and lifestyle imagery for brands that care deeply about aesthetics.',
  },
  {
    num: '04',
    name: 'Creative Direction',
    desc: 'End-to-end creative consultation — concept development, mood-boarding, casting, styling, and art direction for brands seeking a cohesive visual identity.',
  },
  {
    num: '05',
    name: 'Film & Motion',
    desc: 'Cinematic video content for campaigns, brand films, and social media. Seamlessly blending still and moving image to tell richer stories.',
  },
  {
    num: '06',
    name: 'Workshops',
    desc: 'Intimate photography workshops and masterclasses — covering light, composition, fashion photography, and creative vision for aspiring photographers.',
  },
]

export default function Services() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="services" ref={ref}>
      <motion.div
        initial={{ opacity:0, y:40 }}
        animate={inView ? {opacity:1,y:0} : {}}
        transition={{ duration:.9, ease }}
      >
        <div className="sec-label">What I Offer</div>
        <h2 className="sec-title">Services &<br /><em>Expertise</em></h2>
      </motion.div>

      <div className="svc-grid">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            className="svc-card"
            initial={{ opacity:0, y:30 }}
            animate={inView ? {opacity:1,y:0} : {}}
            transition={{ duration:.7, delay: i*.08, ease }}
          >
            <div className="svc-num">{s.num}</div>
            <div className="svc-name">{s.name}</div>
            <p className="svc-desc">{s.desc}</p>
            <div className="svc-arrow"><ArrowUpRight size={20} /></div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
