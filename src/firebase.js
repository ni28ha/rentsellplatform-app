// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRvsJ8QETkpv7iV-TuOupRAqGWBvb8oFw",
  authDomain: "realestate-react-1a75a.firebaseapp.com",
  projectId: "realestate-react-1a75a",
  storageBucket: "realestate-react-1a75a.appspot.com",
  messagingSenderId: "566667792610",
  appId: "1:566667792610:web:08b331f9c7534ccf7f4ebb"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore();