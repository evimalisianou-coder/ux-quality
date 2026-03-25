import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function fadeUp(visible, delay = 0) {
  return visible
    ? { animation: `fadeUp 0.55s ease ${delay}s forwards` }
    : { opacity: 0 }
}
