import React from 'react'
import {Button} from 'react-bootstrap'

const Persons = (props) => {
    const filteredItems = props.filteredItems

    const phoneBook  = () => filteredItems.map(per => { 
        return (
        <div key={per.id} className="contact">
            <i className="material-icons">assignment_ind</i> 
            {per.name} : {per.number} <i className="material-icons delete" onClick={() => props.removePerson}>delete</i>
        </div>
        )
    })
  
    return (
        <div>{phoneBook()}</div>
    )
}

export default Persons;