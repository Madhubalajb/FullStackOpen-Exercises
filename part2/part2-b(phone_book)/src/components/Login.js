import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const Login = (props) => {
 return (
     <Modal show={props.show} onHide={props.close}>
         <Modal.Header closeButton><b>Login</b></Modal.Header>
         <Modal.Body>
             <Form onSubmit={props.login}>
                 <Form.Control type="text" placeholder="Username" onChange={props.username} required/>
                 <Form.Control type="password" placeholder="Password" onChange={props.pwd} required />
                 <center><Button type="submit">Login</Button></center>
             </Form>
         </Modal.Body>
     </Modal>
 )
}

export default Login