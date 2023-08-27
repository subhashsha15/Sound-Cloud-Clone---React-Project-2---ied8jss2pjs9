import React from "react";
import './Message.css'

const Message = (props) => {
    return (
        <>
            <div className="message">
                <div className="message-top">{props.top}</div>
                <div className="message-middle">{props.middle}</div>
                <div className="message-bottom">{props.bottom}</div>
            </div>
        </>
    )
}

export default Message;