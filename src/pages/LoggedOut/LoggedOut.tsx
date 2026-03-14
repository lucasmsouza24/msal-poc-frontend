import { useConfig } from '../../contexts/ConfigContext'
import Button from '../../components/Button/Button'
import './LoggedOut.css'

function LoggedOut() {
    const { BACKEND_URI } = useConfig()

    const handleLogin = () => {
        window.location.href = `${BACKEND_URI}/auth/login`
    }

    return (
        <>
            <h2 className='negative-message'>You are Logged out!</h2>

            <Button label="Login" onClick={handleLogin} />
        </>
    )
}

export default LoggedOut
