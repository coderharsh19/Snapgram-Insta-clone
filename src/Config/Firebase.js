import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC03hYQihgWdUrN9kSGvwidfbYVhUkiGGA",
  authDomain: "snapgram-43830.firebaseapp.com",
  projectId: "snapgram-43830",
  storageBucket: "snapgram-43830.appspot.com",
  messagingSenderId: "723093481176",
  appId: "1:723093481176:web:eb2eced8141c8e371099ad",
});

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, provider };
