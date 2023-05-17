import { doc, deleteDoc, getDoc, DocumentData } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebase-config"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function handler(event) {
    const { id, keyphrase: inputKeyphrase } = JSON.parse(event.body)
    // get a ref for the doc
    const docRef = doc(db, "posts", id)
    // get the doc
    const docSnap: DocumentData = await getDoc(docRef)
    // compare the keyphrase from the request to the keyphrase in the doc
    if (docSnap.data().keyPhrase === inputKeyphrase) {
        await deleteDoc(docRef)
        return {
            statusCode: 200,
        }
    } else {
        return {
            statusCode: 500,
        }
    }
}
