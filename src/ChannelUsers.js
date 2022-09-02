import React from 'react'
import './ChannelUsers.css'
import Profile from './Profile'

export default function ChannelUsers() {
  return (
    <div className='channel-users'>
        <div className = 'channel-online-users'>
            <h3> ONLINE - 1</h3>
            <Profile/>
        </div>
    </div>
  )
}
