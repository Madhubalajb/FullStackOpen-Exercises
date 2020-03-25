import React from 'react'
import {Button} from 'react-bootstrap'

const Persons = (props) => {
    const filteredItems = props.filteredItems

    const phoneBook  = () => filteredItems.map(per => 
        <p key={per.id}>
          {per.name}: {per.number} <Button className = "btn btn-sm" onClick={() => {props.removePerson(per)}}>Delete</Button>
        </p>)
  
    return (
        <div>{phoneBook}</div>
    )
}

export default Persons;