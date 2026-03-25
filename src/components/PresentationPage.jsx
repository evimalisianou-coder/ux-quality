import { t } from './presentation/theme'
import Nav from './presentation/Nav'
import AgendaSection from './presentation/AgendaSection'
import QualitySection from './presentation/QualitySection'
import RisksSection from './presentation/RisksSection'
import MitigationSection from './presentation/MitigationSection'
import ExperimentsSection from './presentation/ExperimentsSection'

export default function PresentationPage() {
  return (
    <div style={{ background: t.bg, minHeight: '100vh', color: t.text }}>
      <Nav />
      <main style={{ paddingTop: '60px' }}>
        <AgendaSection />
        <QualitySection />
        <RisksSection />
        <MitigationSection />
        <ExperimentsSection />
      </main>
    </div>
  )
}
