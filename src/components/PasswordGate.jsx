import { useState, useRef, useEffect } from 'react'

const HASH = __PASSWORD_HASH__

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function PasswordGate({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hash = await sha256(password)
    if (hash === HASH) {
      onSuccess()
    } else {
      setError(true)
      setShaking(true)
      setPassword('')
      setTimeout(() => setShaking(false), 500)
      inputRef.current?.focus()
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#445c3f"/>
            <path d="M8 16l8-8 8 8-8 8-8-8z" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <h1 style={styles.title}>UX Away Day 2026</h1>
        <p style={styles.subtitle}>Enter the password to access the presentation</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={{
            ...styles.inputWrap,
            ...(shaking ? styles.shake : {}),
            ...(error ? styles.inputWrapError : {}),
          }}>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="Password"
              style={styles.input}
              autoComplete="current-password"
            />
          </div>
          {error && <p style={styles.errorMsg}>Incorrect password. Try again.</p>}
          <button type="submit" style={styles.button} disabled={!password}>
            Enter
          </button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1f1a 100%)',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    backdropFilter: 'blur(20px)',
  },
  logo: {
    marginBottom: '8px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#fff',
    letterSpacing: '-0.3px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: '8px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputWrap: {
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.12)',
    transition: 'border-color 0.2s',
    overflow: 'hidden',
  },
  inputWrapError: {
    border: '1px solid rgba(239,68,68,0.6)',
    animation: 'shake 0.4s ease-in-out',
  },
  shake: {
    animation: 'shake 0.4s ease-in-out',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '15px',
    fontFamily: 'inherit',
    letterSpacing: '0.05em',
  },
  errorMsg: {
    fontSize: '13px',
    color: 'rgba(239,68,68,0.9)',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#445c3f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    marginTop: '4px',
  },
}
