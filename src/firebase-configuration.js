// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYvxVgN4rSxqbUj-tJekjXjdwAD87_jXs",
    authDomain: "simpleblog-140ea.firebaseapp.com",
    projectId: "simpleblog-140ea",
    storageBucket: "simpleblog-140ea.appspot.com",
    messagingSenderId: "277821380966",
    appId: "1:277821380966:web:125bfa6b8c754c4d1ed0a7",
    measurementId: "G-BC5F4HER7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

