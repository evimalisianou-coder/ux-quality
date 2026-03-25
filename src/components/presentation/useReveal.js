import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const [animDone, setAnimDone] = useState(false)
  const ref = useRef(null)
  const doneCount = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const onAnimEnd = (total) => {
    doneCount.current += 1
    if (doneCount.current >= total) setAnimDone(true)
  }

  return { ref, visible, animDone, onAnimEnd }
}

export function fadeUp(visible, animDone, delay = 0) {
  if (animDone) return { opacity: 1 }
  return visible
    ? { animation: `fadeUp 0.55s ease ${delay}s forwards` }
    : { opacity: 0 }
}
