// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_CONFIG_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_CONFIG_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_CONFIG_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_CONFIG_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_CONFIG_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_CONFIG_API_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_CONFIG_MEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);