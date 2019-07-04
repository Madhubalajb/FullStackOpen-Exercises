import React from 'react';
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
    if(props.msg === null) {
        return null
    }

    return (
        props.msg
    )
}

export default Notification;