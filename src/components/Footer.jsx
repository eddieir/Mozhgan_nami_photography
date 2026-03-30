function IgIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function WaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.073-1.118l-.292-.174-3.015.857.844-2.94-.19-.302A7.946 7.946 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
    </svg>
  )
}

const FOOTER_SOCIAL_STYLE = {
  display: 'flex', alignItems: 'center', gap: 8,
  fontFamily: 'var(--ff-sans)', fontSize: '.65rem',
  letterSpacing: '.12em', textTransform: 'uppercase',
  color: 'rgba(247,243,238,.5)',
  border: '1px solid rgba(247,243,238,.12)',
  padding: '9px 16px', textDecoration: 'none',
  transition: 'all .3s ease',
}

function SocialBtn({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={FOOTER_SOCIAL_STYLE}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--rose)'
        e.currentTarget.style.borderColor = 'var(--rose)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'rgba(247,243,238,.5)'
        e.currentTarget.style.borderColor = 'rgba(247,243,238,.12)'
      }}>
      {icon} {label}
    </a>
  )
}

export default function Footer() {
  const navCols = [
    {
      title: 'Navigate',
      links: [
        ['About',    '#about'],
        ['Work',     '#work'],
        ['Services', '#services'],
        ['Process',  '#process'],
        ['Contact',  '#contact'],
      ],
    },
    {
      title: 'Services',
      links: [
        ['Fashion & Editorial', '#services'],
        ['Fine Art Portrait',   '#services'],
        ['Product & Brand',     '#services'],
        ['Film & Motion',       '#services'],
        ['Workshops',           '#services'],
      ],
    },
    {
      title: 'Contact',
      links: [
        ['Email',          'mailto:mozhgannamiseghinsara@gmail.com'],
        ['WhatsApp',       'https://wa.me/393515993144'],
        ['Instagram DM',   'https://www.instagram.com/mozhganphotography/'],
        ['Turin, Italy',   'https://maps.google.com/?q=Turin,Italy'],
      ],
    },
  ]

  return (
    <footer>
      <div className="footer-top">
        {/* Brand + socials */}
        <div>
          <div className="footer-logo">Mozhgan <em>Nami</em></div>
          <div className="footer-tagline">Fine Art Photography — Turin, Italy</div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <SocialBtn
              href="https://www.instagram.com/mozhganphotography/"
              icon={<IgIcon />}
              label="Instagram"
            />
            <SocialBtn
              href="https://wa.me/393515993144"
              icon={<WaIcon />}
              label="WhatsApp"
            />
          </div>
        </div>

        {/* Nav columns */}
        <div className="footer-links">
          {navCols.map(col => (
            <div key={col.title} className="footer-col">
              <div className="footer-col-title">{col.title}</div>
              {col.links.map(([label, href]) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} Mozhgan Nami Photography. All rights reserved.
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/mozhganphotography/"
            target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/393515993144"
            target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:mozhgannamiseghinsara@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
