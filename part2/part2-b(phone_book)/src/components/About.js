import React from 'react'
import { Badge } from 'react-bootstrap'
import logo from '../Images/phone-book.png'

const About = () => {
    return (
        <center className="container">
            <div>
                <img src={logo} alt="Logo" />
                <h2>Phonebook App</h2>
                <p><Badge>React JS</Badge> + <Badge>Node JS</Badge> + <Badge>REST API</Badge> + <Badge>Express</Badge> + <Badge>MongoDB</Badge> + <Badge>SASS</Badge> + <Badge>Bootstrap</Badge></p>
            </div>
            <p className="footer">designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">madhubala jayakumaran</a> 
            <br/> On live since 28th June 2019</p>
        </center>
    )
}

export default About