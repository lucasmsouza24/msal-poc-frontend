import { useMsal } from '@azure/msal-react'
import LoggedIn from '../pages/LoggedIn/LoggedIn'
import LoggedOut from '../pages/LoggedOut/LoggedOut'

function AuthContent() {
  const { accounts } = useMsal()

  return accounts.length > 0 ? <LoggedIn /> : <LoggedOut />
}

export default AuthContent
