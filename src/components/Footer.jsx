export default function Footer() {
  const cols = [
    {
      title: 'Navigate',
      links: [['About','#about'],['Work','#work'],['Services','#services'],['Process','#process'],['Contact','#contact']],
    },
    {
      title: 'Services',
      links: [['Fashion & Editorial','#services'],['Fine Art Portrait','#services'],['Product & Brand','#services'],['Film & Motion','#services'],['Workshops','#services']],
    },
    {
      title: 'Connect',
      links: [['Instagram','https://instagram.com'],['Behance','https://behance.net'],['LinkedIn','https://linkedin.com'],['Vimeo','https://vimeo.com']],
    },
  ]

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">Mozhgan <em>Nami</em></div>
          <div className="footer-tagline">Fine Art Photography — Paris & Tehran</div>
        </div>

        <div className="footer-links">
          {cols.map(col => (
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
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://behance.net"   target="_blank" rel="noopener noreferrer">Behance</a>
          <a href="https://vimeo.com"     target="_blank" rel="noopener noreferrer">Vimeo</a>
        </div>
      </div>
    </footer>
  )
}
