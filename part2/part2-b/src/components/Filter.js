import React from 'react';

const Filter = (props) => {
    return (
        <div>filter shown with <input onChange={props.filters} /></div>
    )
}

export default Filter;