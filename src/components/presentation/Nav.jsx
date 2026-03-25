import { useState, useEffect } from 'react'
import { t } from './theme'

const BASE = import.meta.env.BASE_URL

const links = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'quality', label: 'UX Quality' },
  { id: 'risks', label: 'Risks' },
  { id: 'plan', label: 'Mitigation' },
  { id: 'experiments', label: 'Experiments' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = links.map(l => document.getElementById(l.id)).filter(Boolean)
      const current = sections.findLast(el => el.getBoundingClientRect().top <= 100)
      setActive(current?.id ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav style={{ ...styles.nav, background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? `1px solid ${t.border}` : '1px solid transparent' }}>
      <div style={styles.inner}>
        <span style={styles.logo}>
          <img src={`${BASE}kaluza-logo.jpeg`} alt="Kaluza" style={styles.logoImg} />
          <span style={styles.logoText}>UX Away Day 2026</span>
        </span>
        <div style={styles.links}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                ...styles.link,
                color: active === l.id ? t.accent : t.muted,
                borderBottom: active === l.id ? `1px solid ${t.accent}` : '1px solid transparent',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'background 0.3s, border-color 0.3s',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImg: {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
    borderRadius: '4px',
    flexShrink: 0,
    filter: 'invert(1)',
  },
  logoText: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.02em',
  },
  links: {
    display: 'flex',
    gap: '4px',
  },
  link: {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid transparent',
    padding: '6px 14px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'color 0.2s',
    fontFamily: 'inherit',
    paddingBottom: '4px',
  },
}
