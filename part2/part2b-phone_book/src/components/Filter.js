import React from 'react';
import { Form, Col } from 'react-bootstrap'

const Filter = (props) => {
    return (
        <Form>
           Filter shown with
            <Col sm="3">
                <Form.Control className="filter" onChange={props.filters} placeholder="Search..." />
            </Col>
        </Form>
    )
}

export default Filter;