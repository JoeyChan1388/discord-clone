import React from "react";
import "./Login.css";
import { auth, provider } from "./Firebase";

function Login() {
  const signIn = () => {

    auth.signInWithPopup(provider).catch((error) => alert(error.message));

};
  return (
    <div className="login">
      <img className="background" alt="" src="/images/login-background.png"></img>

      <div className="login-form">
        <h2> Welcome Back! </h2>
        <h3> We're so excited to see you again! </h3>
        <div className="input-field">
          <h3> EMAIL OR PHONE NUMBER </h3>
          <input type="text"></input>
        </div>

        <div className="input-field">
          <h3> PASSWORD </h3>
          <input type="password"></input>
        </div>

        <h3> Click 'Login' to log in with Google account! </h3>
        <button onClick={signIn}>Login</button>
      </div>
    </div>
  );
}

export default Login;
