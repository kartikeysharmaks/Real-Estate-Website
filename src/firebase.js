// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkY9nlpkrs8R6rHGxYdF3pWHHSh524mNw",
  authDomain: "realestateprojectks.firebaseapp.com",
  projectId: "realestateprojectks",
  storageBucket: "realestateprojectks.appspot.com",
  messagingSenderId: "1081762206376",
  appId: "1:1081762206376:web:8c96f511ce1979a556a89d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);