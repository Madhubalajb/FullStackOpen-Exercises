import React from 'react';
import { Form, Col } from 'react-bootstrap'

const Filter = (props) => {
    return (
        <Form>
            <Col sm="3">
                <Form.Control className="filter" onChange={props.filters} placeholder="Search Contacts ..." />
            </Col>
        </Form>
    )
}

export default Filter;