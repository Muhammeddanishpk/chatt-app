// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
 
const firebaseConfig = {
  apiKey: "AIzaSyDIVl-eitrJEUiIJx0a2rHu5ydn_BQCM8s",
  authDomain: "chatty-app-4d707.firebaseapp.com",
  projectId: "chatty-app-4d707",
  storageBucket: "chatty-app-4d707.appspot.com",
  messagingSenderId: "185563272100",
  appId: "1:185563272100:web:31c48ae381a110b453a731"
};


 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export const storage = getStorage();
export const db = getFirestore()
