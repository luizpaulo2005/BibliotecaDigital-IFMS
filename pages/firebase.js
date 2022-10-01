import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCdFNaUPOEGlEeKl6KCDxjAj4VXApFo47k",
    authDomain: "adminifms.firebaseapp.com",
    projectId: "adminifms",
    storageBucket: "adminifms.appspot.com",
    messagingSenderId: "319895162614",
    appId: "1:319895162614:web:2da4b5076c5d20f277a6d7"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
