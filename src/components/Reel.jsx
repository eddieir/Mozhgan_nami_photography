import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
const ease = [0.25,0.46,0.45,0.94]
const TICKS = ['Fashion Photography','—','Portrait Sessions','—','Video Production','—','Brand Identity','—','Creative Direction','—','Editorial Work','—']

export default function Reel() {
  const ref = useRef(null), vid = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    if (!vid.current) return
    if (playing) { vid.current.pause(); setPlaying(false) }
    else { vid.current.play(); setPlaying(true) }
  }
  return (
    <section id="reel" className="reel-section" ref={ref}>
      <div className="reel-top">
        <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.9, ease }}>
          <div className="s-eyebrow">Showreel</div>
          <h2 className="s-title">In Motion &</h2>
          <span className="s-title-italic">Story</span>
        </motion.div>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:.8, delay:.3 }}
          style={{ maxWidth:340, fontSize:'.85rem', fontWeight:300, lineHeight:1.85, color:'var(--grey1)' }}>
          Watch how we transform vision into moving image — cinematic campaigns,
          brand films, and editorial videos crafted with precision and artistry.
        </motion.p>
      </div>

      <motion.div className="reel-video-wrap"
        initial={{ opacity:0, scale:.97 }} animate={inView?{opacity:1,scale:1}:{}}
        transition={{ duration:1.1, delay:.2, ease }}>
        <video ref={vid} loop playsInline
          poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4"/>
        </video>
        <div className="reel-play" onClick={toggle}>
          <div className="play-btn-outer">
            {playing
              ? <Pause size={24} color="var(--white)"/>
              : <Play  size={24} color="var(--white)" style={{ marginLeft:3 }}/>}
          </div>
        </div>
      </motion.div>

      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...TICKS,...TICKS].map((t,i) => (
            <span key={i} className={t==='—'?'dot':''}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
