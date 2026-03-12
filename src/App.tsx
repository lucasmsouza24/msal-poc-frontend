import './App.css'
import LoggedIn from './pages/LoggedIn/LoggedIn'
import LoggedOut from './pages/LoggedOut/LoggedOut'

function App() {
  return (
    <>
      <h1>MSAL Auth POC!</h1>

      <section>
        <LoggedOut />
        {/* <LoggedIn /> */}
      </section>
    </>
  )
}

export default App
