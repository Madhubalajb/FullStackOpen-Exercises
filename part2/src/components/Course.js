import React from 'react';
import Header from './Header';
import Content from './Content';

const coursecontent = (props) => props.course.map (course =>
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />   
    </div>  
)

const Course = (props) => {
    return (
        coursecontent(props)
    )
}

export default Course;