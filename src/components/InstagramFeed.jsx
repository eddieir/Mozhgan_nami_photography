import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

// Instagram logo SVG (simple outline)
function IgIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  )
}

function PostItem({ post, index }) {
  const isVideo = post.media_type === 'VIDEO' || post.media_type === 'REELS'
  const imgSrc = isVideo ? post.thumbnail_url : post.media_url
  const caption = post.caption ? post.caption.slice(0, 100) + (post.caption.length > 100 ? '…' : '') : ''
  const date = new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="ig-item"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
    >
      <img src={imgSrc} alt={caption || 'Instagram post'} loading="lazy" />
      {isVideo && (
        <div className="ig-video-badge">
          <PlayIcon />
        </div>
      )}
      <div className="ig-overlay">
        {caption && <p className="ig-caption">{caption}</p>}
        <span className="ig-date">{date}</span>
        <span className="ig-cta">View on Instagram</span>
      </div>
    </motion.a>
  )
}

export default function InstagramFeed() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ok' | 'error'

  useEffect(() => {
    fetch('/.netlify/functions/instagram-feed')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data) || data.error) {
          setStatus('error')
          return
        }
        // Behold uses camelCase: mediaType, mediaUrl, thumbnailUrl
        // Normalise to a consistent shape used by PostItem
        const visible = data
          .filter(p => p.mediaType === 'IMAGE' || p.mediaType === 'VIDEO' || p.mediaType === 'REELS')
          .map(p => ({
            id:            p.id,
            caption:       p.caption,
            media_type:    p.mediaType,
            media_url:     p.sizes?.large?.url || p.mediaUrl,
            thumbnail_url: p.thumbnailUrl,
            permalink:     p.permalink,
            timestamp:     p.timestamp,
          }))
        setPosts(visible)
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section id="instagram" className="ig-section" ref={ref}>
      {/* ── Header ── */}
      <motion.div
        className="ig-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <div>
          <div className="s-eyebrow">Social</div>
          <h2 className="s-title">Latest on</h2>
          <span className="s-title-italic">Instagram</span>
        </div>
        <a
          href="https://www.instagram.com/mozhganphotography"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold ig-follow-btn"
        >
          <IgIcon size={14} />
          Follow @mozhganphotography
        </a>
      </motion.div>

      {/* ── States ── */}
      {status === 'loading' && (
        <div className="ig-state">
          <div className="ig-spinner" />
          <p>Loading feed…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="ig-state ig-state-error">
          <IgIcon size={32} />
          <p>
            Could not load Instagram feed.<br />
            <a
              href="https://www.instagram.com/mozhganphotography"
              target="_blank"
              rel="noopener noreferrer"
            >
              View profile on Instagram →
            </a>
          </p>
        </div>
      )}

      {/* ── Grid ── */}
      {status === 'ok' && posts.length > 0 && (
        <motion.div
          className="ig-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {posts.map((post, i) => (
            <PostItem key={post.id} post={post} index={i} />
          ))}
        </motion.div>
      )}
    </section>
  )
}
