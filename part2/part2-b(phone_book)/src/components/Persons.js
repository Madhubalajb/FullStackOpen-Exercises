import React from 'react'

const Persons = (props) => {
    const filteredItems = props.filteredItems

    const phoneBook  = () => filteredItems.map(per => { 
        return (
            <div key={per.id} className="contact">
                <i className="material-icons person">assignment_ind</i>
                <span className="name">{per.name}</span> - <span className="number">{per.number}</span>
                <i className="material-icons delete" title="Delete Contact" onClick={() => props.remove(per)}>delete</i>
            </div>
        )
    })
    
    if (filteredItems.length === 0) {
        return (
            <div>
                <i className="material-icons">call_end</i>
                <p className="none">None, create some by logging In / Signing Up...</p>
            </div>
        )
    }
    else {
        return (
        <div>{phoneBook()}</div>
        )
    }
}

export default Persons