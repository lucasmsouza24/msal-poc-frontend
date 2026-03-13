import { useMsal } from '@azure/msal-react'
import Button from '../../components/Button/Button'
import './LoggedIn.css'

function LoggedIn() {
    const { instance } = useMsal()

    const handleLogout = () => {
        instance.logoutRedirect().catch(e => {
            console.error(e)
        })
    }

    return (
        <>
            <h2 className='positive-message'>You are Logged In!</h2>

            <Button label='Logout' onClick={handleLogout}/>
        </>
    )

}

export default LoggedIn
