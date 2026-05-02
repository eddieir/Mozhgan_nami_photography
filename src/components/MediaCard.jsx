import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function MediaCard({ item, index, onOpen }) {
  const videoRef = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current && !videoFailed) {
      videoRef.current.play().catch(() => setVideoFailed(true))
    }
  }

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleActivate = () => onOpen(index)

  return (
    <motion.div
      className="wcard"
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title} — ${item.category}`}
      onClick={handleActivate}
      onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setVideoFailed(true)}
            aria-label={item.alt}
          />
          <div className="wcard-play" aria-hidden="true">
            <PlayIcon />
          </div>
        </>
      ) : (
        <img src={item.src} alt={item.alt} loading="lazy" />
      )}
      <div className="wcard-overlay" aria-hidden="true">
        <div className="wcard-cat">{item.category}</div>
        <div className="wcard-title">{item.title}</div>
      </div>
    </motion.div>
  )
}
