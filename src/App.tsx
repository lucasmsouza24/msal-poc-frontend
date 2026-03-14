import './App.css'
import { ConfigProvider } from './contexts/ConfigContext'
import AuthContent from './components/AuthContent'

function App() {
  return (
    <ConfigProvider>
      <h1>MSAL Auth POC!</h1>

      <section>
        <AuthContent />
      </section>
    </ConfigProvider>
  )
}

export default App
