import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import "./Sidebar.css";

function SidebarChannel(props) {
  const dispatch = useDispatch()

  return (
    <div className="sidebar-channel" onClick={() => dispatch(setChannelInfo({channelID: props.id, channelName: props.channelName}))}>
      <h4>
        <span className="sidebar-channel-hashtag">#</span> 
        {props.channelName}
      </h4>
    </div>
  );
}

export default SidebarChannel;
