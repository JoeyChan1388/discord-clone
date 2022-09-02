import { Avatar } from '@mui/material'
import React from 'react'
import './Message.css'

function Message(props) {
  return (
    <div className='message'>
        <img className="message-avatar" src={props.user.photo}/>
        <div className='message-info'>
            <h4>
                {props.user.displayNmae}
                <span className='message-timestamp'>
                    {new Date(props.timestamp?.toDate()).toUTCString()}
                </span>
            </h4>
            <p>{props.message}</p>
        </div>
    </div>
  )
}

export default Message