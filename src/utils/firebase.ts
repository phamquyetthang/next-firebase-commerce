// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB__1E80qlI5TW3MQ0XT8ATOvk5kKtUWM4",
  authDomain: "next-firebase-commerce.firebaseapp.com",
  projectId: "next-firebase-commerce",
  storageBucket: "next-firebase-commerce.appspot.com",
  messagingSenderId: "282457970793",
  appId: "1:282457970793:web:d497e35554ceba8815eaf8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firestore
const db = getFirestore(app);

// storage
const storage = getStorage(app);
// authentication

export { db, storage };
