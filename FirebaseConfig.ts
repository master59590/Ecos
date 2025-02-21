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
  apiKey: "AIzaSyDPuc17hPcCr_rJ6UND2yBTL9ZlEwTESPg",
  authDomain: "yukya-55d29.firebaseapp.com",
  projectId: "yukya-55d29",
  storageBucket: "yukya-55d29.firebasestorage.app",
  messagingSenderId: "155133296855",
  appId: "1:155133296855:android:10075c9947e74a85a87092"
};
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(app);