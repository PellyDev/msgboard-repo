import { getDocs, collection, DocumentData } from "firebase/firestore"
import { initializeApp } from "firebase/app"
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
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function handler(): Promise<{ statusCode: number; body: string }> {
    let posts: Array<DocumentData> = []
    async function getPosts() {
        try {
            const data = await getDocs(collection(db, "posts"))
            posts = data.docs.map((doc) => ({
                ...doc.data(),
                keyPhrase: null,
            }))
        } catch (err) {
            console.log("i error")
        }
    }
    await getPosts()
    return {
        statusCode: 200,
        body: JSON.stringify({ data: posts }),
    }
}
