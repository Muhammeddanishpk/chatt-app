// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
 
const firebaseConfig = {
  apiKey: "AIzaSyB0jSuo7dzakNIEaqPvOjS9T0k1ESt_l9g",
  authDomain: "chatapp-6c70e.firebaseapp.com",
  projectId: "chatapp-6c70e",
  storageBucket: "chatapp-6c70e.appspot.com",
  messagingSenderId: "776001500465",
  appId: "1:776001500465:web:a382bfd7a7caa035e0ec10"
};



 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export const storage = getStorage();
export const db = getFirestore()
