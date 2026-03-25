import { t, wrap, sectionBase } from './theme'
import SectionLabel from './SectionLabel'

const rows = [
  { time: '10:00 – 10:15', what: 'Intro to the day', who: 'Evi', where: 'Clockwise' },
  { time: '10:15 – 12:00', what: 'Tasks pt 1', who: 'All', where: 'Clockwise' },
  { time: '12:00 – 13:00', what: 'Lunch', who: 'All', where: 'Bristol KLZ office' },
  { time: '13:00 – 15:00', what: 'Tasks pt 2', who: 'All', where: 'Bristol office — club room' },
  { time: '15:00 – 16:15', what: 'Kaluza Townhall', who: 'All', where: 'Bristol office — main meeting room' },
  { time: '16:15 – 17:00', what: 'Playback & Wrap up', who: 'All / Evi', where: 'Bristol office — club room', note: 'Neel may be joining us' },
  { time: '17:00 onwards', what: 'Optional social!', who: 'All', where: 'Pub etc' },
]

export default function AgendaSection() {
  return (
    <section id="agenda" style={{ ...sectionBase, borderBottom: `1px solid ${t.border}` }}>
      <div style={wrap}>
        <SectionLabel number={1} label="Today's Agenda" />
        <h2 style={styles.heading}>26 March 2026</h2>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['When', 'What', 'Who', 'Where'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={styles.tr}>
                  <td style={{ ...styles.td, ...styles.time }}>{r.time}</td>
                  <td style={styles.td}>
                    {r.what}
                    {r.note && <span style={styles.note}>{r.note}</span>}
                  </td>
                  <td style={{ ...styles.td, color: t.dim }}>{r.who}</td>
                  <td style={{ ...styles.td, color: t.dim }}>{r.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    marginBottom: '48px',
    lineHeight: 1,
  },
  tableWrap: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: `1px solid ${t.border}`,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px',
  },
  th: {
    textAlign: 'left',
    padding: '14px 20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: t.accent,
    background: t.accentBg,
    borderBottom: `1px solid ${t.accentBorder}`,
  },
  tr: {
    borderBottom: `1px solid ${t.border}`,
  },
  td: {
    padding: '16px 20px',
    color: t.text,
    verticalAlign: 'top',
    lineHeight: 1.5,
  },
  time: {
    color: t.muted,
    fontSize: '13px',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    fontWeight: '500',
  },
  note: {
    display: 'block',
    fontSize: '12px',
    color: t.muted,
    marginTop: '3px',
  },
}
