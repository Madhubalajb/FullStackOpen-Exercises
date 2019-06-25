import React from 'react';

const Notification = (props) => {
    if(props.msg === null) {
        return null
    }

    return (
        <p><b>{props.msg}</b></p>  
    )
}

export default Notification;