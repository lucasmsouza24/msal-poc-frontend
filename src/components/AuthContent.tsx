import { useState, useEffect } from 'react'
import { useConfig } from '../contexts/ConfigContext'
import LoggedIn from '../pages/LoggedIn/LoggedIn'
import LoggedOut from '../pages/LoggedOut/LoggedOut'

function AuthContent() {
  const { BACKEND_URI } = useConfig()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se está autenticado no backend
    fetch(`${BACKEND_URI}/auth/me`, {
      credentials: 'include' // Para enviar cookies se usar sessões
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false))
  }, [BACKEND_URI])

  if (loading) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? <LoggedIn /> : <LoggedOut />
}

export default AuthContent
