function IgIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/></svg>
}
function WaIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.073-1.118l-.292-.174-3.015.857.844-2.94-.19-.302A7.946 7.946 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/></svg>
}
function MailIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="foot-top">
        <div>
          <a href="#" className="foot-brand-name">Mozhgan Nami</a>
          <div className="foot-brand-sub">Photography & Film</div>
          <p className="foot-brand-desc">
            Fine art photography and film based in Turin, Italy.
            Available worldwide for fashion, portrait, product,
            and editorial commissions.
          </p>
          <div className="foot-social">
            <a href="https://www.instagram.com/mozhganphotography/" target="_blank" rel="noopener noreferrer" className="fsoc" title="Instagram"><IgIcon/></a>
            <a href="https://wa.me/393515993144" target="_blank" rel="noopener noreferrer" className="fsoc" title="WhatsApp"><WaIcon/></a>
            <a href="mailto:mozhgannamiseghinsara@gmail.com" className="fsoc" title="Email"><MailIcon/></a>
          </div>
        </div>

        <div className="foot-col">
          <div className="foot-col-title">Navigate</div>
          {[['About','#about'],['Work','#work'],['Services','#services'],['Process','#process'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h}>{l}</a>
          ))}
        </div>

        <div className="foot-col">
          <div className="foot-col-title">Services</div>
          {['Fashion & Editorial','Fine Art Portrait','Product & Brand','Film & Motion','Creative Direction','Workshops'].map(s => (
            <a key={s} href="#services">{s}</a>
          ))}
        </div>

        <div className="foot-col">
          <div className="foot-col-title">Contact</div>
          <a href="mailto:mozhgannamiseghinsara@gmail.com">Email</a>
          <a href="https://wa.me/393515993144" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://www.instagram.com/mozhganphotography/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className="foot-bottom">
        <div className="foot-copy">© {year} Mozhgan Nami Photography. All rights reserved.</div>
        <div className="foot-links">
          <a href="https://www.instagram.com/mozhganphotography/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/393515993144" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:mozhgannamiseghinsara@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
