import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94]
const TICKERS = ['Fashion','·','Portrait','·','Editorial','·','Product','·','Film','·','Identity','·','Light','·','Story','·']

export default function Reel() {
  const ref     = useRef(null)
  const vidRef  = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!vidRef.current) return
    if (playing) { vidRef.current.pause(); setPlaying(false) }
    else { vidRef.current.play(); setPlaying(true) }
  }

  return (
    <section id="reel" className="reel" ref={ref}>
      <div className="reel-inner">
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={inView ? {opacity:1,y:0} : {}}
          transition={{ duration:.9, ease }}
          style={{ marginBottom:48 }}
        >
          <div className="sec-label">Showreel</div>
          <h2 className="sec-title">In <em>Motion</em></h2>
        </motion.div>

        <motion.div
          className="reel-wrapper"
          initial={{ opacity:0, scale:.97 }}
          animate={inView ? {opacity:1,scale:1} : {}}
          transition={{ duration:1.1, delay:.2, ease }}
        >
          <video
            ref={vidRef}
            loop playsInline
            poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
          </video>

          <div className="reel-overlay" onClick={toggle}>
            <div className="play-circle">
              {playing
                ? <Pause size={22} color="var(--ivory)" />
                : <Play  size={22} color="var(--ivory)" style={{ marginLeft:3 }} />
              }
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...TICKERS,...TICKERS].map((t, i) => (
            <span key={i} className={t==='·' ? 'hi' : ''}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
