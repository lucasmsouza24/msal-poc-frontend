import Button from '../../components/Button/Button'
import './LoggedOut.css'

function LoggedOut() {
    return (
        <>
            <h2 className='negative-message'>You are Logged out!</h2>

            <Button label="Login" onClick={() => {}} />
        </>
    )
}

export default LoggedOut
