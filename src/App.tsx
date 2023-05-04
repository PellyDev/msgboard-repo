import Post from "./components/Post"
import { db } from "../firebase-config"
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react"

function App() {
    const [posts, setPosts] = useState([])
    const postCollection = collection(db, "posts")

    async function getPosts() {
        try {
            const data = await getDocs(postCollection)
            console.log(data.docs[0].data())
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getPosts()
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
