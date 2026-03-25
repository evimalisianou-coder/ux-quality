import { useState, useEffect, useRef } from 'react'
import { t, wrap, sectionBase } from './theme'
import SectionLabel from './SectionLabel'
import { useReveal, fadeUp } from './useReveal'

const FULL_TEXT = 'High-quality UX means the user experience\nof our platform is'

function TypewriterHeading() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= FULL_TEXT.length) { setDone(true); return }
    const timeout = setTimeout(() => {
      setDisplayed(FULL_TEXT.slice(0, displayed.length + 1))
    }, 28)
    return () => clearTimeout(timeout)
  }, [started, displayed])

  const lines = displayed.split('\n')

  return (
    <h2 ref={ref} style={styles.heading}>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
      {done && <span style={{ color: t.accent }}>:</span>}
      {!done && <span style={styles.cursor}>|</span>}
    </h2>
  )
}

const pillars = [
  {
    title: 'Accessible by Default',
    body: 'Quality means our products work for everyone, everywhere, without exception.',
    color: t.accent,
    bg: t.accentBg,
    border: t.accentBorder,
  },
  {
    title: 'Consistent by System',
    body: 'We achieve quality by adhering to a unified technical and visual language.',
    color: t.blue,
    bg: t.blueBg,
    border: t.blueBorder,
  },
  {
    title: 'Efficient by Design',
    body: 'Quality is measured by how effectively a user can complete a task across an end-to-end journey.',
    color: t.amber,
    bg: t.amberBg,
    border: t.amberBorder,
  },
]

const goalObjectives = [
  {
    label: 'ENX',
    title: 'Global Inclusivity & Accessibility',
    points: [
      'Deliver critical Accessibility improvements and enable Value Streams to meet Accessibility standards',
    ],
  },
  {
    label: 'ENX',
    title: 'System Consistency & Standards',
    points: [
      'Global best alignment of our products with the Kaluza Brand guidelines',
      'Deliver planned Nebula components to accelerate delivery in Value Streams',
    ],
  },
  {
    label: 'IJM',
    title: 'Journey Efficiency & Health',
    points: [
      'Define, deliver and test UX efficiency & effectiveness metrics',
      'Experience intelligence increases UX efficiency and evidence-based decision making',
    ],
  },
]

export default function QualitySection() {
  const pillarsReveal = useReveal()
  const mitigReveal = useReveal()

  return (
    <section id="quality" style={{ ...sectionBase, borderBottom: `1px solid ${t.border}` }}>
      <div style={wrap}>
        <SectionLabel number={2} label="UX Quality at Kaluza" />
        <TypewriterHeading />
        <p style={styles.subheading}>Definitions and pillars for 2026</p>

        {/* Pillars */}
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
          @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        `}</style>
        <div ref={pillarsReveal.ref} style={styles.pillars}>
          {pillars.map((p, i) => (
            <div key={i} style={{ ...styles.pillar, background: p.bg, borderColor: p.border, ...fadeUp(pillarsReveal.visible, i * 0.15) }}>
              <span style={{ ...styles.pillarLabel, color: p.color }}>{p.title}</span>
              <p style={styles.pillarBody}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* Goal Tree */}
        <div style={styles.goalWrap}>
          <div style={styles.goalHeader}>
            <span style={styles.goalLabel}>KEY RESULT</span>
            <span style={styles.goalKR}>UX quality is at Globally Ready levels</span>
          </div>
          <div style={styles.objectives}>
            {goalObjectives.map((obj, i) => (
              <div key={i} style={styles.objective}>
                <span style={styles.objLabel}>{obj.label}</span>
                <p style={styles.objTitle}>{obj.title}</p>
                <ul style={styles.objPoints}>
                  {obj.points.map((pt, j) => (
                    <li key={j} style={styles.objPoint}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={styles.crossTeam}>
            <span style={styles.crossLabel}>UX TEAM — CROSS-CUTTING</span>
            <p style={styles.crossTitle}>Operationalise UX Excellence</p>
            <p style={styles.crossBody}>
              Drive the awareness, adoption and adherence of ENX & IJM platform team products/metrics,
              and UX functional quality standards in Value Streams, including UX Fitness Tools and AI Design Guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  heading: {
    fontSize: '48px',
    fontWeight: '800',
    color: t.text,
    letterSpacing: '-1.5px',
    lineHeight: 1.1,
    marginBottom: '8px',
  },
  cursor: {
    display: 'inline-block',
    color: t.accent,
    animation: 'blink 0.8s step-end infinite',
    marginLeft: '2px',
  },
  subheading: {
    fontSize: '15px',
    color: t.muted,
    marginBottom: '56px',
  },
  pillars: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '64px',
  },
  pillar: {
    border: '1px solid',
    borderRadius: '12px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  pillarLabel: {
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.02em',
  },
  pillarBody: {
    fontSize: '14px',
    color: t.dim,
    lineHeight: 1.6,
  },
  goalWrap: {
    border: `1px solid ${t.border}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  goalHeader: {
    background: t.accentBg,
    borderBottom: `1px solid ${t.accentBorder}`,
    padding: '20px 28px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  goalLabel: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.14em',
    color: t.accent,
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  goalKR: {
    fontSize: '16px',
    fontWeight: '700',
    color: t.text,
    letterSpacing: '-0.2px',
  },
  objectives: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderBottom: `1px solid ${t.border}`,
  },
  objective: {
    padding: '24px 24px',
    borderRight: `1px solid ${t.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  objLabel: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    color: t.muted,
    textTransform: 'uppercase',
  },
  objTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: t.text,
    lineHeight: 1.3,
    textTransform: 'uppercase',
    letterSpacing: '0.01em',
  },
  objPoints: {
    paddingLeft: '16px',
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  objPoint: {
    fontSize: '13px',
    color: t.dim,
    lineHeight: 1.5,
  },
  crossTeam: {
    padding: '24px 28px',
    background: t.surface,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  crossLabel: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    color: t.muted,
    textTransform: 'uppercase',
  },
  crossTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: t.text,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  crossBody: {
    fontSize: '13px',
    color: t.dim,
    lineHeight: 1.6,
  },
}
