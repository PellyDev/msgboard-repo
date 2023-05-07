import { getDocs, collection, DocumentData } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebase-config"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function handler(): Promise<{ statusCode: number; body: string }> {
    let posts: Array<DocumentData> = []
    async function getPosts() {
        try {
            const querySnap = await getDocs(collection(db, "posts"))
            posts = querySnap.docs.map((doc) => ({
                ...doc.data(),
                keyPhrase: null,
                id: doc.id,
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
