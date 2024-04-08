import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbzHlTEUDUemUP9X6be86ifhQSMz454x4",
  authDomain: "qlct-674fe.firebaseapp.com",
  projectId: "qlct-674fe",
  storageBucket: "qlct-674fe.appspot.com",
  messagingSenderId: "234377460047",
  appId: "1:234377460047:web:e1bd0f9e37f015d883ed3a"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();