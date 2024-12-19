// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" ;
import { getFirestore } from "firebase/firestore" ;
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU7-o0ldeIHMVziDNU8FUo4TMmDOHi3_M",
  authDomain: "ecos-a2289.firebaseapp.com",
  projectId: "ecos-a2289",
  storageBucket: "ecos-a2289.firebasestorage.app",
  messagingSenderId: "825681899489",
  appId: "1:825681899489:web:f8b94cd3e30d19f4d76ca0",
  measurementId: "G-034RDTLXG9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(app);