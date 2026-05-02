import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function MediaLightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const shouldReduce = useReducedMotion()
  const videoRef = useRef(null)
  const item = items[activeIndex]
  const hasPrevNext = items.length > 1

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (item?.type === 'video' && videoRef.current) {
      videoRef.current.load()
    }
  }, [item?.id])

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  if (!item) return null

  const fadeProps = shouldReduce
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } }

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lb-overlay"
        className="lb-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing: ${item.title}`}
        onClick={handleOverlayClick}
        {...fadeProps}
      >
        <button className="lb-close" onClick={onClose} aria-label="Close">
          <X size={13} />
          <span>Close</span>
        </button>

        {hasPrevNext && (
          <>
            <button className="lb-nav lb-prev" onClick={onPrev} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
            <button className="lb-nav lb-next" onClick={onNext} aria-label="Next image">
              <ChevronRight size={28} />
            </button>
          </>
        )}

        <motion.div
          key={item.id}
          className="lb-inner"
          {...(shouldReduce ? {} : {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.97 },
            transition: { duration: 0.3 },
          })}
        >
          {item.type === 'video' ? (
            <video
              ref={videoRef}
              className="lb-video"
              src={item.src}
              poster={item.poster}
              controls
              playsInline
              autoPlay
            />
          ) : (
            <img className="lb-img" src={item.src} alt={item.alt} />
          )}
        </motion.div>

        <div className="lb-caption" aria-hidden="true">
          <div className="lb-caption-title">{item.title}</div>
          <div className="lb-caption-cat">{item.category}</div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
