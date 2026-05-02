import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     to: '/',    spa: true },
  { label: 'Work',     to: '/work', spa: true },
  { label: 'Services', to: '/#services' },
  { label: 'Process',  to: '/#process' },
  { label: 'About',    to: '/#about' },
  { label: 'Contact',  to: '/#contact' },
]

function NavItem({ label, to, spa, onClick }) {
  if (spa) {
    return <Link to={to} onClick={onClick}>{label}</Link>
  }
  return <a href={to} onClick={onClick}>{label}</a>
}

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen]   = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const close = () => setOpen(false)

  return (
    <>
      <header className={solid ? 'solid' : ''}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo-wrap">
            <span className="logo-name">Mozhgan Nami</span>
            <span className="logo-sub">Photography & Film</span>
          </div>
        </Link>

        <nav className="desktop" aria-label="Main navigation">
          {NAV_LINKS.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
          <a href="/#contact" className="nav-cta">Book Session</a>
        </nav>

        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </header>

      <div className={`mob-nav ${open ? 'open' : ''}`} aria-hidden={!open}>
        {NAV_LINKS.map(item => (
          <NavItem key={item.label} {...item} onClick={close} />
        ))}
        <a
          href="/#contact"
          onClick={close}
          style={{
            fontFamily: 'var(--ff-head)', fontSize: '.7rem', fontWeight: 700,
            letterSpacing: '.2em', textTransform: 'uppercase',
            background: 'var(--accent)', color: 'var(--black)',
            padding: '14px 32px', textDecoration: 'none',
          }}
        >
          Book Session
        </a>
      </div>
    </>
  )
}
