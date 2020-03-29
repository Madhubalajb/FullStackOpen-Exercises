import React from 'react'
import logo from '../Images/phone-book.png'
import react from '../Images/reactjs.png'
import node from '../Images/nodejs.png'
import mongodb from '../Images/mongodb.png'

const About = () => {
    return (
        <center className="container">
            <div>
                <img className="phonebook_logo" src={logo} alt="Phonebook Logo" />
                <h2>Phonebook</h2>
                <div className="logos">
                    <span className="logo react">
                      <img src={react} alt="Reactjs" title="React" />
                    </span>
                    <span className="plus">+</span>
                    <span className="logo node">
                        <img src={node} alt="Nodejs" title="Node JS" />
                    </span>
                    <span className="plus">+</span>
                    <span className="logo mongodb">
                        <img src={mongodb} alt="Mongodb" title="mongo DB" />
                    </span>
                </div>
                <ol className="stack">
                    <li className="tech">Express</li>
                    <li className="tech">REST API</li>
                    <li className="tech">SASS</li>
                    <li className="tech">Bootstrap</li>
                </ol>
            </div>
            <p className="footer">designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">madhubala jayakumaran</a></p>
        </center>
    )
}

export default About