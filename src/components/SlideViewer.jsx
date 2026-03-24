import { useState, useEffect, useCallback, useRef } from 'react'

const TOTAL_SLIDES = 18
const BASE = import.meta.env.BASE_URL

const slides = Array.from({ length: TOTAL_SLIDES }, (_, i) => ({
  id: i + 1,
  src: `${BASE}slides/slide_${String(i + 1).padStart(2, '0')}.png`,
}))

export default function SlideViewer() {
  const [current, setCurrent] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [preloaded, setPreloaded] = useState(new Set([0]))
  const controlsTimerRef = useRef(null)

  // Preload adjacent slides
  useEffect(() => {
    const toLoad = [current - 1, current, current + 1, current + 2]
      .filter(i => i >= 0 && i < TOTAL_SLIDES)
    toLoad.forEach(i => {
      if (!preloaded.has(i)) {
        const img = new Image()
        img.src = slides[i].src
        setPreloaded(prev => new Set([...prev, i]))
      }
    })
  }, [current])

  const goTo = useCallback((index) => {
    if (index < 0 || index >= TOTAL_SLIDES || isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        goTo(0)
      } else if (e.key === 'End') {
        goTo(TOTAL_SLIDES - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo])

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000)
  }, [])

  useEffect(() => {
    resetControlsTimer()
    return () => clearTimeout(controlsTimerRef.current)
  }, [])

  // Touch swipe
  const touchStartX = useRef(null)
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      style={styles.container}
      onMouseMove={resetControlsTimer}
      onClick={resetControlsTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide image */}
      <div style={styles.slideWrap}>
        <img
          key={current}
          src={slides[current].src}
          alt={`Slide ${current + 1} of ${TOTAL_SLIDES}`}
          style={{
            ...styles.slide,
            opacity: isTransitioning ? 0 : 1,
          }}
          draggable={false}
        />
      </div>

      {/* Prev / Next click zones */}
      <button
        onClick={prev}
        disabled={current === 0}
        style={{ ...styles.navZone, left: 0 }}
        aria-label="Previous slide"
      />
      <button
        onClick={next}
        disabled={current === TOTAL_SLIDES - 1}
        style={{ ...styles.navZone, right: 0 }}
        aria-label="Next slide"
      />

      {/* Controls overlay */}
      <div style={{
        ...styles.controls,
        opacity: showControls ? 1 : 0,
        pointerEvents: showControls ? 'auto' : 'none',
      }}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{ ...styles.btn, opacity: current === 0 ? 0.3 : 1 }}
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Slide counter + progress dots */}
        <div style={styles.centerControls}>
          <span style={styles.counter}>{current + 1} / {TOTAL_SLIDES}</span>
          <div style={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  ...styles.dot,
                  background: i === current
                    ? '#fff'
                    : i < current
                    ? 'rgba(255,255,255,0.5)'
                    : 'rgba(255,255,255,0.2)',
                  width: i === current ? '20px' : '6px',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={next}
          disabled={current === TOTAL_SLIDES - 1}
          style={{ ...styles.btn, opacity: current === TOTAL_SLIDES - 1 ? 0.3 : 1 }}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    background: '#0f0f0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    userSelect: 'none',
  },
  slideWrap: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    display: 'block',
    transition: 'opacity 0.25s ease',
    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
  },
  navZone: {
    position: 'absolute',
    top: 0,
    bottom: '80px',
    width: '20%',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
    transition: 'opacity 0.4s ease',
    zIndex: 2,
  },
  btn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '28px',
    lineHeight: 1,
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    flexShrink: 0,
    fontFamily: 'inherit',
  },
  centerControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  counter: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.05em',
    fontVariantNumeric: 'tabular-nums',
  },
  dots: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  dot: {
    height: '6px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    transition: 'width 0.2s ease, background 0.2s ease',
    padding: 0,
    flexShrink: 0,
  },
}
