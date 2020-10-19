import { Button } from "@material-ui/core"
import React from "react"
import "./Login.css"

import { auth, provider } from "./firebase"

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message))
  }
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg"
          alt=""
        />
        <h1> iMessage </h1>
      </div>
      <Button onClick={signIn}>sign in</Button>
    </div>
  )
}

export default Login
