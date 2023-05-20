// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBC2tnHCayC5YEZecp4L5lXqU9LUOPGkX0",
  authDomain: "chatty-1f70d.firebaseapp.com",
  projectId: "chatty-1f70d",
  storageBucket: "chatty-1f70d.appspot.com",
  messagingSenderId: "1025421509291",
  appId: "1:1025421509291:web:73eb40b8c31c7cbbb8adee"
};


 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export const storage = getStorage();
export const db = getFirestore()
