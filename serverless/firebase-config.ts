import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyChcCxHLPELXxn1yV5QXlIl6RbL_Kgrv9c",
    authDomain: "msgboard-765aa.firebaseapp.com",
    projectId: "msgboard-765aa",
    storageBucket: "msgboard-765aa.appspot.com",
    messagingSenderId: "112786504672",
    appId: "1:112786504672:web:4fe797015de153f1a28985",
    measurementId: "G-F4KJ2WNH5C",
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
