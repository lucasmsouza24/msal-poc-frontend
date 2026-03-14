import { useState, useEffect } from 'react'
import LoggedIn from '../pages/LoggedIn/LoggedIn'
import LoggedOut from '../pages/LoggedOut/LoggedOut'

interface AuthContentProps {
    BACKEND_URI: string
}

function AuthContent({BACKEND_URI}: AuthContentProps) {
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
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? <LoggedIn BACKEND_URI={BACKEND_URI}/> : <LoggedOut BACKEND_URI={BACKEND_URI}/>
}

export default AuthContent
