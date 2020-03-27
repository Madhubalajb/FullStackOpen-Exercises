import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import UserService from './UserService'

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="sm" className="fixed-top">
            <Navbar.Brand href="/">
                <i className="material-icons house">house</i>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/about">about</Nav.Link>
                    <UserService />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation