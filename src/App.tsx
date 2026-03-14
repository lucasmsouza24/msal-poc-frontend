import './App.css'
import AuthContent from './components/AuthContent'

function App() {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

  return (
    <>
      <h1>MSAL Auth POC!</h1>

      <section>
        <AuthContent BACKEND_URI={BACKEND_URI}/>
      </section>
    </>
  )
}

export default App
