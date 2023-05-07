// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxPDRuuVVmw2p1bw-zfic7N4vC5S8bd-w",
  authDomain: "todo-t3-fc40d.firebaseapp.com",
  projectId: "todo-t3-fc40d",
  storageBucket: "todo-t3-fc40d.appspot.com",
  messagingSenderId: "583101857305",
  appId: "1:583101857305:web:cb23daff17d4be2d443488",
  measurementId: "G-ENWG3WGN8M",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
