import React from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'

const PersonForm = (props) => {
    return (
        <Form onSubmit={props.add}>
            <Row>
                <Col sm="2">
                    <i className="material-icons">person_add</i>
                </Col>
                <Col sm="10">
                    <Form.Control onChange={props.person} value={props.newPerson || ''} placeholder="Contact Name" required />
                </Col>
            </Row>
            <Row>
                <Col sm="2">
                    <i className="material-icons">phone</i>
                </Col>
                <Col sm="10">
                    <Form.Control onChange={props.number} value={props.newNumber || ''} placeholder="Phone Number" required />
                </Col>
            </Row>
            <Button className='btn_icon' type='submit'><
                i className="material-icons">add_circle</i>
                <span>Add</span>
            </Button>
      </Form>
    )
}

export default PersonForm