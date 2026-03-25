import { useState } from 'react'
import { t, wrap, sectionBase } from './theme'
import SectionLabel from './SectionLabel'
import ProcessFlow from './ProcessFlow'

const experiments = [
  {
    number: '01',
    title: 'Synthetic Persona Stress-Testing',
    phase: 'Discovery',
    pillar: 'Make Quality Visible',
    goal: 'To generate actionable insights and usable artefacts about the needs of EV drivers to inform a customer-facing responsive web interface for Kaluza\'s new Retailer Agnostic Flex (RAF) product.',
    parts: [
      { time: '10:15 – 12:00', body: 'Use Claude Code (plus any other AI tools you think would be useful) to do market research on EV drivers, generate insights about their needs, and store the data to Confluence. Create a reusable process.' },
      { time: '13:00 – 15:00', body: 'Use Claude Code to create a synthetic persona and a Claude Skill for stakeholders to interact with. Use it to identify and prioritise knowledge gaps for EV driver customer experience.' },
      { time: '16:15 – 17:00', label: 'Present', body: 'Present your build and insights to the group (10 mins/group).' },
    ],
    tools: [
      'Claude Code (plus other AI tools as you wish) and Figma to ideate, interpret and summarise data',
      'Confluence MCP server to read and write to Confluence',
      'Create a Claude Skill to create a synthetic persona so stakeholders can easily interact with the data',
    ],
    lead: 'James Reece',
    team: ['Amy Gray', 'Anna Fraser', 'Sara Lopez', 'Christine Hoang'],
    color: t.purple,
    bg: t.purpleBg,
    border: t.purpleBorder,
  },
  {
    number: '02',
    title: 'The Design-to-Code Sprint',
    phase: 'Design & Develop',
    pillar: 'Guard the System',
    goal: 'To ideate, design (using Figma Make / Google AI Studio / Stitch etc.) and build (in VS Code) a responsive web interface for Kaluza\'s new Retailer Agnostic Flex (RAF) product — where EV drivers can see the benefits of allowing Kaluza to automatically manage their car\'s charging schedule once they\'ve signed up to Flex.',
    parts: [
      { time: '10:15 – 12:00', body: 'Use Figma (plus any other AI tools you think would be useful) to ideate solutions to the design brief. Move onto building your designs when you feel ready.' },
      { time: '13:00 – 15:00', body: 'Use VSCode to build the design in the browser. Experiment with building the screens, as well as teaching Claude how to reference your design file, tokens, MUI components, etc.' },
    ],
    tools: [
      'Figma Make (plus other AI tools as you wish) to design components that respond to the design brief',
      'Nebula Design System Documentation: components, documentation and research',
      'Figma plugin to export design tokens as JSON for Claude to reference in VSCode',
    ],
    lead: 'Megan Ellis',
    team: ['Kate Hayes', 'Filipe Xavier', 'Ben Whewell', 'Faisal Chaudhuri'],
    color: t.accent,
    bg: t.accentBg,
    border: t.accentBorder,
  },
  {
    number: '03',
    title: 'Automated Design Review',
    phase: 'Quality Assurance',
    pillar: 'Build the Gates',
    goal: 'To transform standard heuristic reviews into an automated "Quality Engine" capable of auditing user journeys through the lens of the Nebula Design System and Kaluza\'s UX quality standards — producing a multimodal evaluator that generates a Friction Report.',
    parts: [
      { time: '10:15 – 12:00', body: 'Identify current heuristic reviews and Nebula standards. Build an automated evaluation framework into a structured Claude (or Gemini) prompt. Define the guiding logic for the Quality Engine.' },
      { time: '13:00 – 15:00', body: 'Refine and test using an existing diff/screenshot. Generate a Friction Report and identify the "Human Delta" — where AI falls short on accessibility and UX judgement.' },
    ],
    tools: [
      'Claude Code: build the reusable system, master prompts, and orchestrate the Quality Engine',
      'Gemini: multimodal stress-testing via screenshots, accessibility and visual QA',
      'Nebula Design System Documentation: components, documentation and research',
      'AI Standards: Core UX principles and internal "Knowledge & Experiments" documentation',
    ],
    lead: 'Flori Galeano',
    team: ['Alice Yeates', 'Evi Malisianou', 'Christian Fradet', 'Ben Tiller'],
    color: t.blue,
    bg: t.blueBg,
    border: t.blueBorder,
  },
]

export default function ExperimentsSection() {
  const [open, setOpen] = useState(null)

  return (
    <section id="experiments" style={{ ...sectionBase }}>
      <div style={wrap}>
        <SectionLabel number={5} label="Experiments" />
        <h2 style={styles.heading}>
          3 experiments<span style={{ color: t.accent }}>.</span>
        </h2>
        <p style={styles.sub}>Supercharging a typical product development process</p>

        <ProcessFlow />

        <div style={styles.list}>
          {experiments.map((exp, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                style={{
                  ...styles.card,
                  borderColor: isOpen ? exp.color : t.border,
                  background: isOpen ? exp.bg : t.surface,
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={styles.cardHeader}
                >
                  <span style={{ ...styles.expNum, color: exp.color }}>{exp.number}</span>
                  <div style={styles.cardMeta}>
                    <div style={styles.cardTitleRow}>
                      <h3 style={styles.cardTitle}>{exp.title}</h3>
                      <div style={styles.tags}>
                        <span style={{ ...styles.tag, color: exp.color, background: exp.bg, borderColor: exp.border }}>
                          {exp.phase}
                        </span>
                        <span style={{ ...styles.tag, color: t.muted, background: t.surface, borderColor: t.border }}>
                          {exp.pillar}
                        </span>
                      </div>
                    </div>
                    <div style={styles.teamPreview}>
                      <span style={styles.leadLabel}>Lead:</span>
                      <span style={{ ...styles.leadName, color: exp.color }}>{exp.lead}</span>
                      <span style={styles.memberCount}>+{exp.team.length} members</span>
                    </div>
                  </div>
                  <span style={{ ...styles.chevron, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ↓
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={styles.cardBody}>
                    <div style={styles.bodyGrid}>
                      <div>
                        <p style={styles.bodyLabel}>Goal</p>
                        <p style={styles.bodyText}>{exp.goal}</p>

                        {exp.parts && (
                          <>
                            <p style={{ ...styles.bodyLabel, marginTop: '28px' }}>Schedule</p>
                            <div style={styles.parts}>
                              {exp.parts.map((part, j) => (
                                <div key={j} style={{ ...styles.part, borderColor: exp.border }}>
                                  <span style={{ ...styles.partTime, color: exp.color }}>
                                    {part.label && <strong>{part.label} · </strong>}{part.time}
                                  </span>
                                  <p style={styles.partBody}>{part.body}</p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {exp.tools && (
                          <>
                            <p style={{ ...styles.bodyLabel, marginTop: '28px' }}>Tools</p>
                            <ul style={styles.toolsList}>
                              {exp.tools.map((tool, j) => (
                                <li key={j} style={styles.toolItem}>
                                  <span style={{ ...styles.toolDot, background: exp.color }} />
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      <div>
                        <p style={styles.bodyLabel}>Team</p>
                        <div style={styles.teamList}>
                          <div style={{ ...styles.member, ...styles.memberLead, color: exp.color, borderColor: exp.border, background: exp.bg }}>
                            <span style={styles.memberRole}>Lead</span>
                            {exp.lead}
                          </div>
                          {exp.team.map((name, j) => (
                            <div key={j} style={styles.member}>{name}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>UX Team Away Day · 26 March 2026</p>
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
  sub: {
    fontSize: '15px',
    color: t.muted,
    marginBottom: '48px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    border: '1px solid',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'border-color 0.2s, background 0.2s',
  },
  cardHeader: {
    width: '100%',
    background: 'none',
    border: 'none',
    padding: '28px 32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  expNum: {
    fontSize: '32px',
    fontWeight: '800',
    letterSpacing: '-1px',
    lineHeight: 1,
    flexShrink: 0,
    fontVariantNumeric: 'tabular-nums',
    marginTop: '2px',
  },
  cardMeta: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  cardTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: t.text,
    letterSpacing: '-0.4px',
  },
  tags: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  teamPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  leadLabel: {
    fontSize: '12px',
    color: t.muted,
  },
  leadName: {
    fontSize: '13px',
    fontWeight: '600',
  },
  memberCount: {
    fontSize: '12px',
    color: t.muted,
  },
  chevron: {
    fontSize: '16px',
    color: t.muted,
    transition: 'transform 0.25s ease',
    flexShrink: 0,
    marginTop: '4px',
  },
  cardBody: {
    borderTop: `1px solid rgba(255,255,255,0.07)`,
    padding: '28px 32px 32px',
  },
  bodyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gap: '40px',
  },
  bodyLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: t.muted,
    marginBottom: '10px',
  },
  bodyText: {
    fontSize: '15px',
    color: t.dim,
    lineHeight: 1.7,
  },
  parts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  part: {
    borderLeft: '2px solid',
    paddingLeft: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  partTime: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    fontVariantNumeric: 'tabular-nums',
  },
  partBody: {
    fontSize: '13px',
    color: t.dim,
    lineHeight: 1.6,
  },
  toolsList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  toolItem: {
    fontSize: '13px',
    color: t.dim,
    lineHeight: 1.5,
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },
  toolDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '6px',
  },
  teamList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  member: {
    fontSize: '14px',
    color: t.dim,
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '6px',
    border: `1px solid ${t.border}`,
  },
  memberLead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
  },
  memberRole: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  footer: {
    marginTop: '80px',
    paddingTop: '32px',
    borderTop: `1px solid ${t.border}`,
    textAlign: 'center',
  },
  footerText: {
    fontSize: '13px',
    color: t.muted,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
}
