// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYxGyWFDYMOKAGG4ssJZNVzh4scAxe8F4",
    authDomain: "wanderlusty-4aad5.firebaseapp.com",
    projectId: "wanderlusty-4aad5",
    storageBucket: "wanderlusty-4aad5.appspot.com",
    messagingSenderId: "565569923721",
    appId: "1:565569923721:web:fe6a71c465d241082b3458",
    measurementId: "G-V00Y81N7R9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);