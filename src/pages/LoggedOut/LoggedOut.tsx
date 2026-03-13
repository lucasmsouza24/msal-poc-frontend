import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../auth/authConfig'
import Button from '../../components/Button/Button'
import './LoggedOut.css'

function LoggedOut() {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e)
        })
    }

    return (
        <>
            <h2 className='negative-message'>You are Logged out!</h2>

            <Button label="Login" onClick={handleLogin} />
        </>
    )
}

export default LoggedOut
