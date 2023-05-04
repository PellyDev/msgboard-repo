// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChcCxHLPELXxn1yV5QXlIl6RbL_Kgrv9c",
    authDomain: "msgboard-765aa.firebaseapp.com",
    projectId: "msgboard-765aa",
    storageBucket: "msgboard-765aa.appspot.com",
    messagingSenderId: "112786504672",
    appId: "1:112786504672:web:4fe797015de153f1a28985",
    measurementId: "G-F4KJ2WNH5C",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
