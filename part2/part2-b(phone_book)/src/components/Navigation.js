import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserService from './UserService'

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="sm" className="fixed-top">
            <Navbar.Brand href="/">
                <i className="material-icons house" title="Home">house</i>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link><Link to="/about">about</Link></Nav.Link>
                    <UserService />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation