import { useEffect, useRef } from 'react'
export default function Cursor() {
  const dot = useRef(null), ring = useRef(null)
  useEffect(() => {
    const mv = e => {
      const s = (el, x, y) => { if(el){ el.style.left=x+'px'; el.style.top=y+'px' }}
      s(dot.current, e.clientX, e.clientY); s(ring.current, e.clientX, e.clientY)
    }
    document.addEventListener('mousemove', mv)
    const on = () => { dot.current?.classList.add('big'); ring.current?.classList.add('big') }
    const off = () => { dot.current?.classList.remove('big'); ring.current?.classList.remove('big') }
    const attach = () => document.querySelectorAll('a,button,.port-item,.testi-card,.svc-item,.pstep').forEach(el => {
      el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off)
    })
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList:true, subtree:true })
    return () => { document.removeEventListener('mousemove', mv); obs.disconnect() }
  }, [])
  return (<><div className="cur-dot" ref={dot}/><div className="cur-ring" ref={ring}/></>)
}
