import { t, wrap, sectionBase } from './theme'
import SectionLabel from './SectionLabel'

const columns = [
  {
    title: 'Build the Gates',
    fix: 'No shared definition of quality',
    color: t.amber,
    bg: t.amberBg,
    border: t.amberBorder,
    points: [
      { text: 'UX Fitness Tests baked into the release cycle', done: true },
      { text: 'ER Gate: WCAG AA, Adherence to Nebula, event tracking', done: true },
      { text: 'GR Gate: i18n/l10n, Global journeys mapped', done: true },
      { text: 'UX Quality in DOR and DOD', done: true },
    ],
  },
  {
    title: 'Make Quality Visible',
    fix: 'Flying blind',
    color: t.red,
    bg: t.redBg,
    border: t.redBorder,
    points: [
      { text: 'UX Quality metrics mapped to business KPIs', cross: true },
      { text: 'Shared Dashboards for PMs and Designers', cross: true },
      { text: 'Quarterly reviews baked into QBRs', cross: true },
      { text: 'Centralised accessible insights', cross: true },
    ],
  },
  {
    title: 'Own the Journey',
    fix: 'Structural shortcuts',
    color: t.blue,
    bg: t.blueBg,
    border: t.blueBorder,
    points: [
      { text: 'Single point of accountability for E2E Global journeys' },
      { text: 'Measured by Journey Time to Completion (JTC)' },
      { text: 'User Friction Score (UFS)' },
    ],
  },
  {
    title: 'Guard the System',
    fix: 'Ungoverned AI experimentation',
    color: t.purple,
    bg: t.purpleBg,
    border: t.purpleBorder,
    points: [
      { text: 'AI governance so prototypes stay on-brand in code' },
      { text: 'Figma Make templates, MCP and Code Connect' },
      { text: 'Automated Design QA' },
      { text: 'Post-release UX feedback route' },
    ],
  },
]

export default function MitigationSection() {
  return (
    <section id="plan" style={{ ...sectionBase, borderBottom: `1px solid ${t.border}` }}>
      <div style={wrap}>
        <SectionLabel number={4} label="Mitigation Plan" />
        <h2 style={styles.heading}>
          We have a<br />mitigation plan<span style={{ color: t.accent }}>.</span>
        </h2>

        <div style={styles.grid}>
          {columns.map((col, i) => (
            <div key={i} style={{ ...styles.col, borderTop: `3px solid ${col.color}` }}>
              <div style={styles.colHeader}>
                <span style={{ ...styles.fixTag, color: col.color, background: col.bg, border: `1px solid ${col.border}` }}>
                  Fixes: {col.fix}
                </span>
                <h3 style={styles.colTitle}>{col.title}</h3>
              </div>
              <ul style={styles.points}>
                {col.points.map((pt, j) => (
                  <li key={j} style={styles.point}>
                    {pt.done
                      ? <span style={styles.tick}>✓</span>
                      : pt.cross
                      ? <span style={styles.cross}>✕</span>
                      : <span style={{ ...styles.dot, background: col.color }} />
                    }
                    <span style={pt.done ? styles.pointDone : undefined}>{pt.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
    marginBottom: '56px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  col: {
    background: t.surface,
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  colHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  fixTag: {
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.06em',
    padding: '3px 8px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
  colTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: t.text,
    letterSpacing: '-0.2px',
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  points: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  point: {
    fontSize: '13px',
    color: t.dim,
    lineHeight: 1.5,
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '6px',
  },
  tick: {
    color: '#4ade80',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
    lineHeight: 1.5,
  },
  cross: {
    color: '#f87171',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
    lineHeight: 1.5,
  },
  pointDone: {
    color: t.dim,
  },
}
