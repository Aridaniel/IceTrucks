// Set up our auth so we can authenticate somebody
import firebase from 'firebase';
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBynClm5XAjCR-aOJ6ZlXXMRZUeHhwsIkY",
  authDomain: "ice-truck-2d148.firebaseapp.com",
  databaseURL: "https://ice-truck-2d148-default-rtdb.firebaseio.com/",
  projectId: "ice-truck-2d148",
  storageBucket: "ice-truck-2d148.appspot.com",
  messagingSenderId: "17833584937",
  appId: "1:17833584937:web:a8fbce19bfd5f74003af38"
};

export default function firebaseClient() {
  if(!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
};