import { IconButton } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import MicNoneIcon from "@material-ui/icons/MicNone"
import "./Chat.css"
import Message from "./Message"
import { useSelector } from "react-redux"

import { selectchatName, selectchatId } from "./features/chatSlice"
import { selectUser } from "./features/userSlice"
import firebase from "firebase"
import FlipMove from "react-flip-move"
import db from "./firebase"

function Chat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const user = useSelector(selectUser)
  const chatName = useSelector(selectchatName)
  const chatId = useSelector(selectchatId)

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        )
    }
  }, [chatId])

  console.log("user", user)
  console.log("input", input)
  console.log("chatId", chatId)
  console.log("g", firebase.firestore.FieldValue.serverTimestamp())
  const sendMessage = (e) => {
    e.preventDefault()

    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    })

    //firbase

    setInput("")
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To : <span className="chat__name">{chatName} </span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      {/* chat Message */}
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
