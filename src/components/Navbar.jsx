import { useState, useEffect } from 'react'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Work',     href: '#work'     },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process'  },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [solid, setSolid]   = useState(false)
  const [open,  setOpen]    = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className={solid ? 'solid' : ''}>
        <a href="#" className="logo">Mozhgan <em>Nami</em></a>

        {/* Desktop nav */}
        <nav>
          {links.map(l => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
          <a href="#contact" className="nav-book">Book Session</a>
        </nav>

        {/* Burger */}
        <button className="burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </header>

      {/* Mobile overlay */}
      <div className={`mob-nav ${open ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} style={{
          fontFamily: 'var(--ff-sans)', fontSize: '.8rem', letterSpacing: '.18em',
          textTransform: 'uppercase', background: 'var(--charcoal)',
          color: 'var(--white)', padding: '14px 32px', textDecoration: 'none'
        }}>Book Session</a>
      </div>
    </>
  )
}
