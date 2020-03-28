import React from 'react'

const Persons = (props) => {
    const filteredItems = props.filteredItems

    const phoneBook  = () => filteredItems.map(per => { 
        return (
        <div key={per.id} className="contact">
            <i className="material-icons">assignment_ind</i> 
            <span className="name">{per.name} </span> : <span className="number"> {per.number}</span>
            <i className="material-icons delete" onClick={() => props.remove(per)}>delete</i>
        </div>
        )
    })
  
    return (
        <div>{phoneBook()}</div>
    )
}

export default Persons;