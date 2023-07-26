
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCCh6zI9nwLf_GF6aFMoXYsQBa7odDuldk",
    authDomain: "trans-coders.firebaseapp.com",
    projectId: "trans-coders",
    storageBucket: "trans-coders.appspot.com",
    messagingSenderId: "456265345353",
    appId: "1:456265345353:web:8da2480e35a1b19b37d298"
  }


firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
  
const timestamp = firebase.firestore.Timestamp
  
export { db, auth, timestamp, storage }