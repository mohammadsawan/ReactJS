import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.React_APP_FIREBASE_API_KEY,
  authDomain: process.env.React_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.React_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.React_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.React_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.React_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInWithEmail = (email, pass) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};
