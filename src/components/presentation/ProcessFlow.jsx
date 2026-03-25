import { useEffect, useRef, useState } from 'react'
import { t } from './theme'

const experiments = [
  {
    number: 'Experiment #1',
    title: 'Synthetic Persona Stress-Testing',
    phase: 'Discovery',
    detail: 'Understand the needs of an EV Driver',
    color: t.purple,
    bg: t.purpleBg,
    border: t.purpleBorder,
    pillar: 'Guard the System',
  },
  {
    number: 'Experiment #2',
    title: 'The Design-to-Code Sprint',
    phase: 'Design and Develop',
    detail: 'To create a smart charging app',
    color: t.accent,
    bg: t.accentBg,
    border: t.accentBorder,
    pillar: 'Make Quality Visible',
  },
  {
    number: 'Experiment #3',
    title: 'Automated Design Review',
    phase: 'Quality Assurance',
    detail: "Test against Kaluza's UX quality standards",
    color: t.blue,
    bg: t.blueBg,
    border: t.blueBorder,
    pillar: 'Build the Gates',
  },
]

export default function ProcessFlow() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={styles.wrap}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes growX {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* Title */}
      <p style={{
        ...styles.title,
        ...(visible ? { animation: 'fadeUp 0.5s ease forwards' } : { opacity: 0 }),
      }}>
        Supercharging a typical product development process
      </p>

      {/* Cards + connectors */}
      <div style={styles.flow}>
        {experiments.map((exp, i) => (
          <div key={i} style={styles.cardWrap}>
            <div style={{
              ...styles.card,
              borderColor: exp.border,
              ...(visible ? {
                animation: `fadeUp 0.55s ease ${0.2 + i * 0.18}s forwards`,
              } : { opacity: 0 }),
            }}>
              <span style={{ ...styles.expNum, color: exp.color }}>{exp.number}</span>
              <p style={styles.expTitle}>{exp.title}</p>
              <div style={{ ...styles.phaseBadge, background: exp.bg, borderColor: exp.border, color: exp.color }}>
                {exp.phase}
              </div>
              <p style={styles.expDetail}>{exp.detail}</p>
            </div>

            {i < experiments.length - 1 && (
              <div style={{
                ...styles.connectorWrap,
                ...(visible ? {
                  animation: `growX 0.4s ease ${0.4 + i * 0.18}s forwards`,
                } : { transform: 'scaleX(0)' }),
              }}>
                <div style={styles.line} />
                <div style={styles.arrow} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pillar labels */}
      <div style={styles.pillars}>
        {experiments.map((exp, i) => (
          <div key={i} style={{
            ...styles.pillarLabel,
            ...(visible ? {
              animation: `fadeUp 0.5s ease ${0.6 + i * 0.15}s forwards`,
            } : { opacity: 0 }),
          }}>
            <span style={{ ...styles.pillarDot, background: exp.color }} />
            <span style={{ color: exp.color }}>{exp.pillar}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    border: `1px solid ${t.border}`,
    borderRadius: '16px',
    padding: '32px 36px 28px',
    background: t.surface,
    marginBottom: '48px',
    overflow: 'hidden',
  },
  title: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: t.muted,
    marginBottom: '28px',
    opacity: 0,
  },
  flow: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 0,
  },
  cardWrap: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    flex: 1,
    border: '1px solid',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    opacity: 0,
  },
  expNum: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  expTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: t.text,
    lineHeight: 1.3,
    letterSpacing: '-0.2px',
  },
  phaseBadge: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '4px',
    border: '1px solid',
    alignSelf: 'flex-start',
    marginTop: '2px',
  },
  expDetail: {
    fontSize: '12px',
    color: t.muted,
    lineHeight: 1.5,
  },
  connectorWrap: {
    display: 'flex',
    alignItems: 'center',
    width: '40px',
    flexShrink: 0,
    transformOrigin: 'left center',
    transform: 'scaleX(0)',
  },
  line: {
    flex: 1,
    height: '1px',
    background: `rgba(255,255,255,0.15)`,
  },
  arrow: {
    width: 0,
    height: 0,
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: `6px solid rgba(255,255,255,0.25)`,
  },
  pillars: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: `1px solid ${t.border}`,
  },
  pillarLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: 1,
    opacity: 0,
  },
  pillarDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    flexShrink: 0,
  },
}
