import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

const PAIRS = [
  {
    label: 'Bridal Couture',
    tag: 'Fashion → Editorial',
    before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80',
    after:  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
    desc:   'A candid bridal moment elevated into a high-concept couture editorial — cinematic colour grading, directional light, intentional negative space.',
  },
  {
    label: 'Portrait Campaign',
    tag: 'Portrait → Campaign',
    before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80',
    after:  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80',
    desc:   'Natural studio portrait transformed into a luxury brand campaign image — precise skin science, editorial colour palette, conceptual atmosphere.',
  },
]

const CAPABILITIES = [
  { title: 'Concept Generation',  desc: 'AI-driven mood boarding, reference synthesis, and creative brief development' },
  { title: 'Style Transfer',       desc: 'Seamless aesthetic consistency applied across an entire asset library' },
  { title: 'Scene Architecture',   desc: 'Expand, enrich, or completely reconstruct the visual environment' },
  { title: 'Colour Science',       desc: 'Cinematic colour grading with tonal depth and brand alignment' },
]

function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onMouseDown = useCallback((e) => { isDragging.current = true; updatePos(e.clientX) }, [updatePos])
  const onMouseMove = useCallback((e) => { if (isDragging.current) updatePos(e.clientX) }, [updatePos])
  const onMouseUp   = useCallback(() => { isDragging.current = false }, [])
  const onTouchStart = useCallback((e) => { isDragging.current = true; updatePos(e.touches[0].clientX) }, [updatePos])
  const onTouchMove  = useCallback((e) => { e.preventDefault(); updatePos(e.touches[0].clientX) }, [updatePos])
  const onTouchEnd   = useCallback(() => { isDragging.current = false }, [])

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'none' }}
    >
      <img src={before} alt="Before AI direction" className="ba-img" draggable={false} />

      <div className="ba-after-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={after} alt="After AI direction" className="ba-img" draggable={false} />
      </div>

      <div className="ba-divider" style={{ left: `${pos}%` }}>
        <div className="ba-handle" aria-label="Drag to compare">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      <div className="ba-pill ba-pill-left">Raw Capture</div>
      <div className="ba-pill ba-pill-right">AI Directed</div>
    </div>
  )
}

export default function AiArtDirection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  return (
    <section id="ai-direction" className="ai-section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <div className="s-eyebrow">AI Art Direction</div>
        <div className="ai-title-row">
          <div>
            <h2 className="s-title">Before &</h2>
            <span className="s-title-italic">After</span>
          </div>
          <p className="ai-intro">
            Where photographic mastery meets artificial intelligence. We transform raw captures
            into conceptually driven visual narratives — pushing creative limits without creative compromise.
          </p>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="ai-grid">
        {/* Slider */}
        <motion.div
          className="ai-slider-col"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
            >
              <BeforeAfterSlider
                key={active}
                before={PAIRS[active].before}
                after={PAIRS[active].after}
              />
            </motion.div>
          </AnimatePresence>

          {/* Pair tabs */}
          <div className="ba-tabs">
            {PAIRS.map((p, i) => (
              <button
                key={i}
                className={`ba-tab${active === i ? ' on' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="ba-tab-num">0{i + 1}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content panel */}
        <motion.div
          className="ai-content-col"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="ai-pair-tag">{PAIRS[active].tag}</div>
              <h3 className="ai-pair-label">{PAIRS[active].label}</h3>
              <p className="ai-pair-desc">{PAIRS[active].desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="ai-divider" />

          <div className="ai-capabilities">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                className="ai-cap"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
              >
                <div className="ai-cap-dot" />
                <div>
                  <div className="ai-cap-title">{c.title}</div>
                  <div className="ai-cap-desc">{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <a href="#contact" className="btn-gold" style={{ marginTop: 44, display: 'inline-block', cursor: 'none' }}>
            Request a Demo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
