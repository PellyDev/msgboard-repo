import Post from "./components/Post"
import { db } from "../firebase-config"
import { getDocs, collection, DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"

function App() {
    const [posts, setPosts] = useState<Array<DocumentData>>([])
    const postCollection = collection(db, "posts")

    async function getPosts() {
        try {
            const data = await getDocs(postCollection)
            setPosts(data.docs.map((doc) => doc.data()))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="App">
            <div className="flex justify-center gap-8 flex-wrap">
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default App
