import { collection, addDoc, DocumentData, getDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "./firebase-config"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// generate an avatar id for the post between 0 and 2
function generateAvatarId() {
    return Math.floor(Math.random() * 3)
}

export async function handler(
    event
): Promise<{ statusCode: number; body: string }> {
    let statusCode = 500
    let doc: DocumentData = {}
    const avatarId = generateAvatarId()
    const date = new Date()
    const post = {
        ...JSON.parse(event.body),
        avatarId,
        date,
    }
    try {
        doc = await getDoc(await addDoc(collection(db, "posts"), post))
        statusCode = 200
    } catch {
        statusCode = 500
    }
    return {
        statusCode,
        body: JSON.stringify({
            doc: {
                ...doc.data(),
                keyPhrase: null,
                id: doc.id,
            },
        }),
    }
}
