import { useState, useEffect } from 'react'
const LINKS = [
  ['About','#about'],['Work','#work'],['Instagram','#instagram'],
  ['Services','#services'],['Process','#process'],['Contact','#contact']
]
export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <>
      <header className={solid ? 'solid' : ''}>
        <a href="#" style={{ textDecoration:'none' }}>
          <div className="logo-wrap">
            <span className="logo-name">Mozhgan Nami</span>
            <span className="logo-sub">Photography & Film</span>
          </div>
        </a>
        <nav className="desktop">
          {LINKS.map(([l,h]) => <a key={l} href={h}>{l}</a>)}
          <a href="#contact" className="nav-cta">Book Session</a>
        </nav>
        <button className="burger" onClick={() => setOpen(!open)}>
          <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }}/>
          <span style={{ opacity: open ? 0 : 1 }}/>
          <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }}/>
        </button>
      </header>
      <div className={`mob-nav ${open ? 'open' : ''}`}>
        {LINKS.map(([l,h]) => <a key={l} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a href="#contact" onClick={() => setOpen(false)} style={{
          fontFamily:'var(--ff-head)', fontSize:'.7rem', fontWeight:700,
          letterSpacing:'.2em', textTransform:'uppercase',
          background:'var(--accent)', color:'var(--black)', padding:'14px 32px', textDecoration:'none'
        }}>Book Session</a>
      </div>
    </>
  )
}
