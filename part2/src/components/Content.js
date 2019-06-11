import React from 'react';
import Part from './Part';

const parts = (props) => props.parts.map(part => 
    <Part key={part.id} content={part}/>
)

const Content = (props) => {
    return (
        <div>{parts(props)}</div>
    )
}

export default Content;