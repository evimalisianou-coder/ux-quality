import { useState, useEffect } from 'react'
import PasswordGate from './components/PasswordGate'
import PresentationPage from './components/PresentationPage'

const SESSION_KEY = 'ux_presentation_auth'

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })

  useEffect(() => {
    const root = document.getElementById('root')
    if (!authenticated) {
      root?.classList.add('gate')
    } else {
      root?.classList.remove('gate')
    }
  }, [authenticated])

  const handleAuth = () => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setAuthenticated(true)
  }

  if (!authenticated) {
    return <PasswordGate onSuccess={handleAuth} />
  }

  return <PresentationPage />
}
