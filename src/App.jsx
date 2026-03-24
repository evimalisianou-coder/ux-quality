import { useState, useEffect } from 'react'
import PasswordGate from './components/PasswordGate'
import SlideViewer from './components/SlideViewer'

const SESSION_KEY = 'ux_presentation_auth'

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })

  const handleAuth = () => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setAuthenticated(true)
  }

  if (!authenticated) {
    return <PasswordGate onSuccess={handleAuth} />
  }

  return <SlideViewer />
}
