import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const Signup = (props) => {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>Sign Up</Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.signup}>
                    <Form.Control type="text" placeholder="Name" onChange={props.name} required/>
                    <Form.Control type="text" placeholder="Username" onChange={props.username} required/>
                    <Form.Control type="password" placeholder="Password" onChange={props.pwd} required/>
                    <center><Button type="submit">Signup</Button></center>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Signup