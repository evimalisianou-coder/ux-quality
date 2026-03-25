import { useState, useRef } from 'react'
import { t, wrap, sectionBase } from './theme'
import SectionLabel from './SectionLabel'
import { useReveal } from './useReveal'

const risks = [
  {
    title: 'No Shared Definition of Quality',
    points: [
      'Quality = visual polish, not functional performance',
      'Not clear ownership for journey health',
      'No pass/fail criteria at release',
    ],
    color: t.amber,
    bg: t.amberBg,
    border: t.amberBorder,
  },
  {
    title: 'We Are Flying Blind',
    points: [
      'No way to measure the business value of UX',
      'No cost-of-inaction data for trade-offs',
      'Prioritisation is guesswork, not evidence',
    ],
    color: t.red,
    bg: t.redBg,
    border: t.redBorder,
  },
  {
    title: 'Structural Shortcuts',
    points: [
      'Aggressive deadlines dictate trade-offs',
      'Client requirement lists drive delivery, not user needs',
      'No post-release feedback loop',
    ],
    color: t.blue,
    bg: t.blueBg,
    border: t.blueBorder,
  },
  {
    title: 'Ungoverned AI Experimentation',
    points: [
      'AI prototypes without quality oversight',
      'Misaligned assets across teams and instances',
      'Nebula not yet at Enterprise level',
    ],
    color: t.purple,
    bg: t.purpleBg,
    border: t.purpleBorder,
  },
]

export default function RisksSection() {
  const [active, setActive] = useState(null)
  const [animDone, setAnimDone] = useState(false)
  const { ref, visible } = useReveal()
  const doneCount = useRef(0)

  const toggle = (i) => setActive(prev => prev === i ? null : i)

  const handleAnimEnd = () => {
    doneCount.current += 1
    if (doneCount.current >= risks.length) setAnimDone(true)
  }

  return (
    <section id="risks" ref={ref} style={{ ...sectionBase, borderBottom: `1px solid ${t.border}` }}>
      <div style={wrap}>
        <style>{`
          @keyframes spotlight {
            0%   { opacity: 0; filter: blur(12px); transform: scale(0.97); }
            60%  { filter: blur(2px); }
            100% { opacity: 1; filter: blur(0px); transform: scale(1); }
          }
        `}</style>
        <SectionLabel number={3} label="Risks" />
        <h2 style={styles.heading}>
          Risks against<br />meeting our KR<span style={{ color: t.red }}>.</span>
        </h2>
        <p style={styles.hint}>Click a risk to focus</p>

        <div style={styles.grid}>
          {risks.map((r, i) => {
            const isActive = active === i
            const isDimmed = active !== null && !isActive
            const entryStyle = animDone
              ? {}
              : visible
              ? { animation: `spotlight 0.7s ease ${i * 0.18}s forwards` }
              : { opacity: 0 }
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                onAnimationEnd={handleAnimEnd}
                style={{
                  ...styles.card,
                  ...entryStyle,
                  background: isActive ? r.bg : t.surface,
                  borderColor: isActive ? r.color : t.border,
                  opacity: isDimmed ? 0.35 : animDone ? 1 : undefined,
                  transform: isActive ? 'scale(1.02)' : animDone ? 'scale(1)' : undefined,
                }}
              >
                <div style={styles.cardNum}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ ...styles.cardTitle, color: isActive ? r.color : t.text }}>{r.title}</h3>
                <ul style={styles.points}>
                  {r.points.map((pt, j) => (
                    <li key={j} style={styles.point}>{pt}</li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const styles = {
  heading: {
    fontSize: '52px',
    fontWeight: '800',
    color: t.text,
    letterSpacing: '-1.5px',
    lineHeight: 1.1,
    marginBottom: '8px',
  },
  hint: {
    fontSize: '13px',
    color: t.muted,
    marginBottom: '48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  card: {
    textAlign: 'left',
    border: '1px solid',
    borderRadius: '16px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardNum: {
    fontSize: '11px',
    fontWeight: '700',
    color: t.muted,
    letterSpacing: '0.1em',
    fontVariantNumeric: 'tabular-nums',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
    lineHeight: 1.2,
    transition: 'color 0.25s',
  },
  points: {
    paddingLeft: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '4px',
  },
  point: {
    fontSize: '14px',
    color: t.dim,
    lineHeight: 1.5,
  },
}
