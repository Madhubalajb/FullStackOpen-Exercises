import React, {useState} from 'react'
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
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
            setUser(savedUser)
            setName('')
            setUsername('')
            setPassword('')
            handleSignupNoModal()
        })
        .catch(error => {
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
                <Nav.Link><Link to="/user">{user.name}</Link></Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </div>
        )
    }
}

export default Userservice