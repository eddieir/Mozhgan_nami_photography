import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import MediaCard from './MediaCard'
import MediaLightbox from './MediaLightbox'
import { WORK_ITEMS } from '../data/workData'

const ease = [0.25, 0.46, 0.45, 0.94]
const CATS = ['All', 'Bridal', 'Fashion', 'Product']

export default function WorkPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const shouldReduce = useReducedMotion()

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const showHeader = headerInView || shouldReduce

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = activeCat === 'All'
    ? WORK_ITEMS
    : WORK_ITEMS.filter(i => i.category === activeCat)

  const handleCatChange = (cat) => {
    setLightboxIndex(null)
    setActiveCat(cat)
  }

  const openLightbox = (idx) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const prevItem = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length)
  const nextItem = () => setLightboxIndex(i => (i + 1) % filtered.length)

  return (
    <>
      <Navbar />
      <main className="wpage">

        {/* Page header */}
        <motion.div
          ref={headerRef}
          className="wpage-header"
          initial={{ opacity: 0, y: 30 }}
          animate={showHeader ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <div className="s-eyebrow">Portfolio</div>
          <h1 className="wpage-title">Selected Work</h1>
          <p className="wpage-subtitle">
            Photography and films across bridal stories, fashion editorials, and product campaigns.
          </p>
        </motion.div>

        {/* Category tabs */}
        <nav className="wcat-bar" aria-label="Filter by category">
          {CATS.map(cat => (
            <button
              key={cat}
              className={`wcat-tab${activeCat === cat ? ' active' : ''}`}
              onClick={() => handleCatChange(cat)}
              aria-pressed={activeCat === cat}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            className="wgallery"
            role="list"
            aria-label={`${activeCat} portfolio gallery`}
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            {filtered.map((item, i) => (
              <div key={item.id} role="listitem">
                <MediaCard item={item} index={i} onOpen={openLightbox} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="wpage-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="wpage-cta-title">Ready to create your visual story?</div>
          <p className="wpage-cta-body">
            Available for bridal, fashion, product, portrait, film, and brand projects.
          </p>
          <div className="wpage-cta-btns">
            <a href="/#contact" className="btn-gold">Book a Session</a>
            <a href="/#contact" className="btn-ghost">Contact</a>
          </div>
        </motion.div>

      </main>
      <Footer />

      {lightboxIndex !== null && (
        <MediaLightbox
          items={filtered}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </>
  )
}
