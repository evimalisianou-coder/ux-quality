import { t, wrap, sectionBase } from './theme'

export default function WelcomeSection() {
  return (
    <section id="welcome" style={{ ...sectionBase, borderBottom: `1px solid ${t.border}`, padding: '120px 0 100px' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
      `}</style>
      <div style={wrap}>
        <div style={styles.eyebrow}>
          <span style={styles.dot} />
          <span style={styles.eyebrowText}>UX Team Away Day · 26 March 2026</span>
        </div>
        <h1 style={styles.heading}>
          Experimenting with<br />
          AI tools to accelerate<br />
          <span style={{ color: t.accent }}>UX quality.</span>
        </h1>
        <div style={styles.byline}>
          <div style={styles.avatar}>EM</div>
          <div>
            <p style={styles.name}>Evi Malisianou</p>
            <p style={styles.title}>Director of User Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '40px',
    animation: 'fadeUp 0.5s ease 0.1s both',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: t.accent,
    flexShrink: 0,
  },
  eyebrowText: {
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: t.muted,
  },
  heading: {
    fontSize: 'clamp(42px, 6vw, 80px)',
    fontWeight: '800',
    color: t.text,
    letterSpacing: '-2px',
    lineHeight: 1.05,
    marginBottom: '56px',
    animation: 'fadeUp 0.6s ease 0.2s both',
  },
  byline: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    animation: 'fadeUp 0.6s ease 0.35s both',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: t.accentBg,
    border: `1px solid ${t.accentBorder}`,
    color: t.accent,
    fontSize: '13px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.05em',
    flexShrink: 0,
  },
  name: {
    fontSize: '15px',
    fontWeight: '600',
    color: t.text,
  },
  title: {
    fontSize: '13px',
    color: t.muted,
    marginTop: '2px',
  },
}
