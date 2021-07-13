import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "snapgram-43830",
  storageBucket: "snapgram-43830.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, provider, storageRef };
