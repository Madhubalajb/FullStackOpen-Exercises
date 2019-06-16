import React from 'react';

const PersonForm = (props) => {
    return (
        <form onSubmit={props.add}>
            <div>name: <input onChange={props.person} required/> </div>
            <div>number: <input onChange={props.number} required/></div>
            <div>
            <button type='submit'>add</button>
            </div>
      </form>
    )
}

export default PersonForm;