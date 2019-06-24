import React from 'react';
import Part from './Part';

const parts = (props) => props.parts.map(part => 
    <Part key={part.id} content={part}/>
)

const total = (props) => props.parts.reduce((sum, part) =>
    sum += part.exercises, 0
)

const Content = (props) => {
    return (
        <div>
            {parts(props)}
            <b>total of {total(props)} exercises</b>
        </div>
    )
}

export default Content;