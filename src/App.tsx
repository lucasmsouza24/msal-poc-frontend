import './App.css'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './auth/msalInstance'
import AuthContent from './components/AuthContent'

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <h1>MSAL Auth POC!</h1>

      <section>
        <AuthContent />
      </section>
    </MsalProvider>
  )
}

export default App
