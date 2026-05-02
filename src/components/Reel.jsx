import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94]

const TICKER_ITEMS = [
  'Fashion Photography', '—', 'Portrait Sessions', '—', 'Video Production',
  '—', 'Brand Identity', '—', 'Creative Direction', '—', 'Editorial Work', '—',
]

// Vertical videos (9:16 — Reels / TikTok style)
const VERTICAL_VIDEOS = [
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    label: 'Fashion',
    title: 'Couture Noir',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    label: 'Portrait',
    title: 'Golden Hour',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    label: 'Editorial',
    title: 'Urban Silence',
  },
]

// Horizontal videos (16:9 — Cinematic)
const HORIZONTAL_VIDEOS = [
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80',
    title: 'Main Showreel 2024',
    duration: '2:34',
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    title: 'Behind the Lens',
    duration: '1:48',
  },
]

// ── Vertical Video Card ──────────────────────────────────────────────────────
function VerticalCard({ video, index, onExpand }) {
  const vidRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20%' })

  // Auto-pause when out of view
  useEffect(() => {
    if (!inView && playing) {
      vidRef.current?.pause()
      setPlaying(false)
    }
  }, [inView]) // eslint-disable-line

  const toggle = () => {
    if (!vidRef.current) return
    if (playing) { vidRef.current.pause(); setPlaying(false) }
    else { vidRef.current.play(); setPlaying(true) }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!vidRef.current) return
    vidRef.current.muted = !muted
    setMuted(m => !m)
  }

  const onTimeUpdate = () => {
    const v = vidRef.current
    if (v && v.duration) setProgress((v.currentTime / v.duration) * 100)
  }

  return (
    <motion.div
      ref={ref}
      className="vcard"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
    >
      {/* Video */}
      <div className="vcard-media" onClick={toggle}>
        <video
          ref={vidRef}
          src={video.src}
          poster={video.poster}
          loop
          muted={muted}
          playsInline
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {/* Gradient overlay */}
        <div className="vcard-overlay" />

        {/* Play / Pause button */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              className="vcard-play-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Play size={22} color="var(--white)" style={{ marginLeft: 3 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls bar */}
      <div className="vcard-controls">
        {/* Progress bar */}
        <div className="vcard-progress">
          <div className="vcard-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="vcard-ctrl-row">
          <button className="vcard-ctrl-btn" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
            {playing
              ? <Pause size={14} color="var(--white)" />
              : <Play size={14} color="var(--white)" style={{ marginLeft: 1 }} />}
          </button>
          <button className="vcard-ctrl-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
            {muted
              ? <VolumeX size={14} color="var(--grey1)" />
              : <Volume2 size={14} color="var(--white)" />}
          </button>
          <div className="vcard-label">{video.label}</div>
          <button className="vcard-ctrl-btn vcard-expand" onClick={() => onExpand(video)} title="Full screen">
            <Maximize2 size={13} color="var(--grey1)" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="vcard-title">{video.title}</div>
    </motion.div>
  )
}

// ── Horizontal Video Player ──────────────────────────────────────────────────
function HorizontalPlayer({ video, index }) {
  const vidRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20%' })

  useEffect(() => {
    if (!inView && playing) {
      vidRef.current?.pause()
      setPlaying(false)
    }
  }, [inView]) // eslint-disable-line

  const toggle = () => {
    if (!vidRef.current) return
    if (playing) { vidRef.current.pause() }
    else { vidRef.current.play() }
  }

  const toggleMute = () => {
    if (!vidRef.current) return
    vidRef.current.muted = !muted
    setMuted(m => !m)
  }

  const onTimeUpdate = () => {
    const v = vidRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
    const s = Math.floor(v.currentTime)
    setCurrentTime(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
  }

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    if (vidRef.current && vidRef.current.duration) {
      vidRef.current.currentTime = ratio * vidRef.current.duration
    }
  }

  const fullscreen = () => vidRef.current?.requestFullscreen?.()

  return (
    <motion.div
      ref={ref}
      className="hplayer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease }}
    >
      {/* Video */}
      <div className="hplayer-media" onClick={toggle}>
        <video
          ref={vidRef}
          src={video.src}
          poster={video.poster}
          loop
          muted={muted}
          playsInline
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="hplayer-overlay" />

        {/* Centre play / pause */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              className="hplayer-play-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
            >
              <Play size={28} color="var(--white)" style={{ marginLeft: 4 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title badge */}
        <div className="hplayer-title-badge">
          <span className="hplayer-badge-label">Film</span>
          <span className="hplayer-badge-title">{video.title}</span>
        </div>

        {/* Duration */}
        <div className="hplayer-duration">{video.duration}</div>
      </div>

      {/* Bottom controls */}
      <div className="hplayer-controls">
        {/* Seekbar */}
        <div className="hplayer-seekbar" onClick={seek}>
          <div className="hplayer-seekbar-fill" style={{ width: `${progress}%` }}>
            <div className="hplayer-seekbar-thumb" />
          </div>
        </div>

        <div className="hplayer-ctrl-row">
          <button className="hctrl-btn" onClick={toggle}>
            {playing
              ? <Pause size={16} color="var(--white)" />
              : <Play size={16} color="var(--white)" style={{ marginLeft: 2 }} />}
          </button>
          <button className="hctrl-btn" onClick={toggleMute}>
            {muted
              ? <VolumeX size={16} color="var(--grey1)" />
              : <Volume2 size={16} color="var(--white)" />}
          </button>
          <span className="hplayer-time">{currentTime} / {video.duration}</span>
          <button className="hctrl-btn hctrl-fs" onClick={fullscreen}>
            <Maximize2 size={15} color="var(--grey1)" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ video, onClose }) {
  const vidRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    vidRef.current?.play()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const toggle = () => {
    if (!vidRef.current) return
    if (playing) { vidRef.current.pause(); setPlaying(false) }
    else { vidRef.current.play(); setPlaying(true) }
  }

  const toggleMute = () => {
    if (!vidRef.current) return
    vidRef.current.muted = !muted
    setMuted(m => !m)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-inner"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          onClick={e => e.stopPropagation()}
        >
          <video
            ref={vidRef}
            src={video.src}
            poster={video.poster}
            loop
            muted={muted}
            playsInline
            autoPlay
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
          />
          {/* Lightbox controls */}
          <div className="lb-controls">
            <button className="lb-btn" onClick={toggle}>
              {playing ? <Pause size={18} color="#fff" /> : <Play size={18} color="#fff" style={{ marginLeft: 2 }} />}
            </button>
            <button className="lb-btn" onClick={toggleMute}>
              {muted ? <VolumeX size={18} color="rgba(255,255,255,.5)" /> : <Volume2 size={18} color="#fff" />}
            </button>
            <span style={{ flex: 1 }} />
            <button className="lb-btn lb-close" onClick={onClose}>
              <X size={18} color="#fff" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main Reel Section ─────────────────────────────────────────────────────────
export default function Reel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [lightboxVideo, setLightboxVideo] = useState(null)

  return (
    <>
      <section id="reel" className="reel-section" ref={ref}>

        {/* Header */}
        <div className="reel-header">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            <div className="s-eyebrow">Showreel</div>
            <h2 className="s-title">In Motion & Story</h2>
          </motion.div>

          <motion.p
            className="reel-header-desc"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Cinematic campaigns, brand films, and editorial videos — crafted
            frame by frame with precision and artistry. Available in portrait
            and landscape format for every platform.
          </motion.p>
        </div>

        {/* ── Vertical videos ─────────────────────────────────────────── */}
        <motion.div
          className="reel-section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span>Vertical Format</span>
          <div className="reel-section-line" />
          <span className="reel-section-tag">9:16 · Reels / TikTok</span>
        </motion.div>

        <div className="vcards-grid">
          {VERTICAL_VIDEOS.map((v, i) => (
            <VerticalCard
              key={v.src}
              video={v}
              index={i}
              onExpand={setLightboxVideo}
            />
          ))}
        </div>

        {/* ── Horizontal videos ───────────────────────────────────────── */}
        <motion.div
          className="reel-section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: 72 }}
        >
          <span>Cinematic Format</span>
          <div className="reel-section-line" />
          <span className="reel-section-tag">16:9 · Film / Campaign</span>
        </motion.div>

        <div className="hplayers-grid">
          {HORIZONTAL_VIDEOS.map((v, i) => (
            <HorizontalPlayer key={v.src} video={v} index={i} />
          ))}
        </div>

        {/* Ticker */}
        <div className="ticker-wrap" style={{ marginTop: 72 }}>
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className={t === '—' ? 'dot' : ''}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxVideo && (
        <Lightbox video={lightboxVideo} onClose={() => setLightboxVideo(null)} />
      )}
    </>
  )
}
