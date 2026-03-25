import { t } from './theme'

export default function SectionLabel({ number, label }) {
  return (
    <div style={styles.wrap}>
      <span style={styles.num}>{String(number).padStart(2, '0')}</span>
      <span style={styles.label}>{label}</span>
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '48px',
  },
  num: {
    fontSize: '11px',
    fontWeight: '700',
    color: t.accent,
    letterSpacing: '0.12em',
    fontVariantNumeric: 'tabular-nums',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    color: t.muted,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
  },
}
