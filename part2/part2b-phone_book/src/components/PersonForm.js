import React from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'

const PersonForm = (props) => {
    return (
        <Form onSubmit={props.add}>
            <Row>
                <Col>Name</Col>
                <Col sm="8">
                    <Form.Control onChange={props.person} placeholder="Contact Name" required />
                </Col>
            </Row>
            <Row>
                <Col>Number</Col>
                <Col sm="8">
                    <Form.Control onChange={props.number} placeholder="Phone Number" required />
                </Col>
            </Row>
            <Button className='btn btn-sm' type='submit'>Add</Button>
      </Form>
    )
}

export default PersonForm;