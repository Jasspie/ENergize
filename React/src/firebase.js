import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Firebase setup
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const firestore = app.firestore();
export const database = {
  recipes: firestore.collection("recipes"),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};
export const storage = app.storage();
export const auth = app.auth();
export default app;
