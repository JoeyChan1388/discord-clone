import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./Firebase";

function Profile() {
  const user = useSelector(selectUser);

  return (
    <div className="profile-info">
      <img
        className="avatar"
        referrerPolicy="no-referrer"
        src={user.photo}
      />
      <div className="profile-info">
        <h3>
          <span className="sidebar-profile-user-name">{user.displayNmae}</span>
        </h3>
      </div>
    </div>
  );
}

export default Profile;
