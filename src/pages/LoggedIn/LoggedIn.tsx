import Button from '../../components/Button/Button'
import './LoggedIn.css'

interface LoggedInProps {
    BACKEND_URI: string
}

function LoggedIn({BACKEND_URI}: LoggedInProps) {

    const handleLogout = () => {
        window.location.href = `${BACKEND_URI}/auth/logout`
    }

    return (
        <>
            <h2 className='positive-message'>You are Logged In!</h2>

            <Button label='Logout' onClick={handleLogout}/>
        </>
    )

}

export default LoggedIn
