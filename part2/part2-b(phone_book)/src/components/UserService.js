import React, {useState, useEffect} from 'react'
import {Nav} from 'react-bootstrap'
import LoginModal from './Login'
import SignupModal from './Signup'
import Notification from './Notification'
import loginService from '../services/login'
import signupService from '../services/signup'
import phoneService from '../services/phoneService'

const Userservice = () => {
    const [loginModal, setLoginModal] = useState(false)
    const handleLoginModal = () => setLoginModal(true)
    const handleLoginNoModal = () => setLoginModal(false)

    const [signupModal, setSignupModal] = useState(false)
    const handleSignupModal = () => setSignupModal(true)
    const handleSignupNoModal = () => setSignupModal(false)
    
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('logged_PhoneApp_User')
        if(loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            phoneService.setToken(user.token)
        }
    }, []) 

    const showMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }

    const makeNull = () => {
        setName('')
        setUsername('')
        setPassword('')
    }

    const handleName = (event) => setName(event.target.value)
    const handleUsername = (event) => setUsername(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const handleLogin = async (event) => {
        event.preventDefault()
        await loginService.login({
            username, password
        })
        .then(user => {
            window.localStorage.setItem('logged_PhoneApp_User', JSON.stringify(user))
            phoneService.setToken(user.token)
            setUser(user)
            makeNull()
            handleLoginNoModal()
            window.location.reload(false)
            showMessage(<div id="snackbar">Hi {user.username} <i className="material-icons">sentiment_very_satisfied</i></div>)
        })
        .catch(error => {
            setUser('')
            makeNull()
            handleLoginNoModal()
            showMessage(<div id="snackbar">Sorry {user.username}, something went wrong <i className="material-icons">sentiment_very_dissatisfied</i></div>)
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        await signupService.signup({
            name, username, password
        })
        .then(savedUser => {
            setUser('')
            makeNull()
            handleSignupNoModal()
            showMessage(<div id="snackbar">User {savedUser.username} added <i className="material-icons">sentiment_very_satisfied</i></div>)
        })
    }

    const logout = () => {
        showMessage(<div id="snackbar">Bye {user.username} <i className="material-icons">sentiment_dissatisfied</i></div>)
        setUser('')
        window.localStorage.removeItem('logged_PhoneApp_User')
        phoneService.setToken('')
        setTimeout(() => window.location.reload(false), 6000)
    }

    if(user === '') {
        return (
            <div>
                <Notification msg = {message} />
                <Nav.Link onClick={handleLoginModal}>Login</Nav.Link>
                <LoginModal show={loginModal} close={handleLoginNoModal} username={handleUsername} pwd={handlePassword} login={handleLogin}/>

                <Nav.Link onClick={handleSignupModal}>Signup</Nav.Link>
                <SignupModal show={signupModal} close={handleSignupNoModal} name={handleName} username={handleUsername} pwd={handlePassword} signup={handleSignup}/>
            </div>
        )
    }
    else {
        return (
            <div>
                <Notification msg = {message} />
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </div>
        )
    }
}

export default Userservice