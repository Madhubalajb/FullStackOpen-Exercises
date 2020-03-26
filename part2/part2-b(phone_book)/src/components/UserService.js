import React, {useState, useEffect} from 'react'
import {Nav} from 'react-bootstrap'
import LoginModal from './Login'
import SignupModal from './Signup'
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

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('logged_PhoneApp_User')
        if(loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            phoneService.setToken(user.token)
        }
    }, []) 

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
            setUsername('')
            setPassword('')
            handleLoginNoModal()
        })
        .catch(error => {
            setUser('')
            setUsername('')
            setPassword('')
            handleLoginNoModal()
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        await signupService.signup({
            name, username, password
        })
        .then(savedUser => {
            setUser('')
            setName('')
            setUsername('')
            setPassword('')
            handleSignupNoModal()
        })
    }

    const logout = () => {
        setUser('')
        window.localStorage.removeItem('logged_PhoneApp_User')
        phoneService.setToken('')
    }

    if(user === '') {
        return (
            <div>
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
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </div>
        )
    }
}

export default Userservice