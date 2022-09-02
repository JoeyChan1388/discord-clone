import React, { useEffect, useState } from "react";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PushPinIcon from "@mui/icons-material/PushPin";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import HelpIcon from "@mui/icons-material/Help";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import NoteIcon from "@mui/icons-material/Note";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./Chat.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChannelID, selectChannelName } from "./features/appSlice";
import db from "./Firebase";
import firebase from "firebase/compat/app";

function Chat() {
  // Get global state from the selectors in user and app slices.
  const user = useSelector(selectUser);
  const channelID = useSelector(selectChannelID);
  const channelName = useSelector(selectChannelName);

  // Local state (per channel)
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Get channel messages from firebase channel collection and add to messages state.
  useEffect(() => {
    setMessages([]);
    if (channelID) {
      db.collection("channels")
        .doc(channelID)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }
    //console.log(messages);
  }, [channelID]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    //console.log(inputMessage)

    db.collection("channels").doc(channelID).collection("messages").add({
      message: inputMessage,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInputMessage("");
    document.getElementById("messageBox").value = "";
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-header-left">
          <h3>
            <span className="chat-header-hashtag">#</span>
            {channelName}
          </h3>
        </div>

        <div className="chat-header-right">
          <TagIcon />
          <NotificationsIcon />
          <PushPinIcon />
          <PeopleAltIcon />

          <div className="chat-header-search">
            <input placeholder="Search"></input>
            <SearchIcon fontSize="large" />
          </div>
          <InboxIcon />
          <HelpIcon />
        </div>
      </div>

      <div className="chat-messages">
        {
        messages.map((message) => (
          <Message key={message.id} user={message.user} message={message.message} timestamp={message.timestamp} />
        ))
        }
      </div>

      <form className="chat-input" onSubmit={handleMessageSubmit}>
        <AddCircleIcon />
        <input
          type="text"
          id="messageBox"
          value={inputMessage}
          disabled={!channelID}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message #${channelName}`}
        ></input>
        <CardGiftcardIcon fontSize="large" />
        <GifBoxIcon fontSize="large" />
        <NoteIcon fontSize="large" />
        <EmojiEmotionsIcon fontSize="large" />
      </form>
    </div>
  );
}

export default Chat;
