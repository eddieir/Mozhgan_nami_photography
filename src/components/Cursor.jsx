import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + 'px'; dot.current.style.top  = e.clientY + 'px' }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px' }
    }
    document.addEventListener('mousemove', onMove)

    const hoverTargets = () => document.querySelectorAll('a,button,.g-item,.ab-img,.svc-card,.testi-card')
    const add    = () => { dot.current?.classList.add('big');    ring.current?.classList.add('big') }
    const remove = () => { dot.current?.classList.remove('big'); ring.current?.classList.remove('big') }

    const attach = () => {
      hoverTargets().forEach(el => { el.addEventListener('mouseenter', add); el.addEventListener('mouseleave', remove) })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => { document.removeEventListener('mousemove', onMove); observer.disconnect() }
  }, [])

  return (
    <>
      <div className="cur-dot"  ref={dot}  />
      <div className="cur-ring" ref={ring} />
    </>
  )
}
