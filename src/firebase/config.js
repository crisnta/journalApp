// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDKo1YFa3k8t4PChrGlM6IQ-mh_HFuUo8",
  authDomain: "react-cursos-c07f0.firebaseapp.com",
  projectId: "react-cursos-c07f0",
  storageBucket: "react-cursos-c07f0.appspot.com",
  messagingSenderId: "817522225898",
  appId: "1:817522225898:web:b37c7d5affb2f4a13c5d93"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )