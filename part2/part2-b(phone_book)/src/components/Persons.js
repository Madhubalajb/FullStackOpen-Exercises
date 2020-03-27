import React from 'react'
import {Button} from 'react-bootstrap'

const Persons = (props) => {
    const filteredItems = props.filteredItems

    const phoneBook  = () => filteredItems.map(per => 
        <p key={per.id}> <i className="material-icons">person</i>
            {per.name}: {per.number} 
            <Button className = "btn btn-sm" onClick={() => {props.removePerson(per)}}>
              <i class="material-icons">remove_circle</i>
            </Button>
        </p>)
  
    return (
        <div>{phoneBook()}</div>
    )
}

export default Persons;