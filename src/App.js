import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Login from './Login';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {selectUser} from './features/userSlice'
import { auth } from './Firebase';
import {login, logout} from './features/userSlice'
import ChannelUsers from './ChannelUsers';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayNmae: authUser.displayName,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch]);

  return (

    <div className="app">
      {user ? (
        <>
        <Sidebar />
        <Chat/>
        <ChannelUsers/>
        </>
      ): (
        <Login/>
      )}
      
    </div>
  );
}

export default App;
