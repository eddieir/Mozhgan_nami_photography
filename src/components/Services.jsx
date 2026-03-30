import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
const ease = [0.25,0.46,0.45,0.94]

function CameraIcon() {
  return <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
}
function FilmIcon() {
  return <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
}
function StarIcon() {
  return <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function EyeIcon() {
  return <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function PenIcon() {
  return <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
}
function UsersIcon() {
  return <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}

const SVCS = [
  { num:'01', Icon:CameraIcon, name:'Fashion & Editorial', desc:'High-concept fashion campaigns, magazine editorials, and lookbooks. From intimate studio sessions to large-scale location shoots.' },
  { num:'02', Icon:EyeIcon,    name:'Fine Art Portrait',   desc:'Personal portraits that capture character, mood, and moment. Every sitting is a collaborative, unhurried exploration of the authentic self.' },
  { num:'03', Icon:StarIcon,   name:'Product & Brand',     desc:'Still-life and product photography crafted to make objects extraordinary. Packaging, jewellery, cosmetics, and lifestyle imagery.' },
  { num:'04', Icon:FilmIcon,   name:'Film & Motion',       desc:'Cinematic video content for campaigns, brand films, and social. Seamlessly blending still and moving image to tell richer stories.' },
  { num:'05', Icon:PenIcon,    name:'Creative Direction',  desc:'End-to-end creative consultation — concept, mood-boarding, casting, styling, and art direction for cohesive visual identity.' },
  { num:'06', Icon:UsersIcon,  name:'Workshops',           desc:'Intimate photography workshops and masterclasses covering light, composition, fashion photography, and creative vision.' },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <section id="services" className="services-section" ref={ref}>
      <motion.div className="services-header"
        initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}}
        transition={{ duration:.9, ease }}>
        <div>
          <div className="s-eyebrow">What I Offer</div>
          <h2 className="s-title">Services &</h2>
          <span className="s-title-italic">Expertise</span>
        </div>
        <p className="services-header-desc">
          Every project is approached with full creative commitment — from concept
          to final delivery, each image is meticulously crafted to tell your story.
        </p>
      </motion.div>

      <div className="svc-grid">
        {SVCS.map((s,i) => (
          <motion.div key={s.num} className="svc-item" data-num={s.num}
            initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:.7, delay:i*.07, ease }}>
            <s.Icon/>
            <div className="svc-name">{s.name}</div>
            <p className="svc-desc">{s.desc}</p>
            <a href="#contact" className="svc-link">
              Book Now <ArrowUpRight size={14}/>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
