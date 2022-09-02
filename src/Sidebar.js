import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarChannel from "./SidebarChannel";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./Firebase";
import { selectChannelName } from "./features/appSlice";

function Sidebar() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName)
  const [channels, SetChannels] = useState([])

  useEffect(() => {
    db.collection('channels').onSnapshot(snapshot => {
      SetChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        channel: doc.data(),
      })));
    })
  },[])

  const addChannel = () => {
    const channelName = prompt('Enter a Channel Name');

    if (channelName) {
      db.collection('channels').add({
        channelName: channelName,
      })
    }

  }

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h3> {channelName} </h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar-channels">
        <div className="sidebar-channels-header">
          <div className="sidebar-header">
            <ExpandMoreIcon />
            <h4> Text Channels </h4>
          </div>

          <AddIcon onClick={addChannel} className="sidebar-addChannel" />
        </div>

        <div className="sidebar-channels-list"></div>
        {channels.map((channel) => (
          <SidebarChannel key={channel.id} id={channel.id} channelName={channel.channel.channelName}/>
        ))}   
      </div>

      <div className="sidebar-voice">
        <SignalCellularAltIcon className="sidebar-voice-icon connected" fontSize="large"/>
        <div className="sidebar-voice-info">
          <h3 className="connected"> Voice Connected </h3>
          <p> General </p>
        </div>

        <div className="sidebar-voice-icon"> 
        <PhoneDisabledIcon />
        </div>
      </div>

      <div className="sidebar-profile">
        <img className="avatar" onClick={() => auth.signOut()} referrerPolicy="no-referrer" src={user.photo} />
        <div className="sidebar-profile-info">
          <h3><span className="sidebar-profile-user-name">{user.displayNmae}</span></h3>
          <p>#0123</p>
        </div>

        <div className="sidebar-profile-icons">
          <MicIcon fontSize="large"/>
          <HeadphonesIcon fontSize="large"/>
          <SettingsIcon fontSize="large"/>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
