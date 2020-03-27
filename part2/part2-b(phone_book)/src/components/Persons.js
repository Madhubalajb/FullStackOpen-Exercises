import React from 'react'

const Persons = (props) => {
    const filteredItems = props.filteredItems

    const phoneBook  = () => filteredItems.map(per => 
        <div key={per.id}> 
            <i className="material-icons">assignment_ind</i>
                {per.name}
                {per.number} 
            <i class="material-icons" onClick={() => props.removePerson(per)}>delete</i>
        </div>)
  
    return (
        <div>{phoneBook()}</div>
    )
}

export default Persons;