import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBWD_-n06KKFSCtU0Iy8iGUW7aKDU0K2VI",
  authDomain: "imessage-clone-286ec.firebaseapp.com",
  databaseURL: "https://imessage-clone-286ec.firebaseio.com",
  projectId: "imessage-clone-286ec",
  storageBucket: "imessage-clone-286ec.appspot.com",
  messagingSenderId: "732978449141",
  appId: "1:732978449141:web:a6fa3c7399d53d73acd3bc",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
