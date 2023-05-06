import Post from "./components/Post"
import { DocumentData } from "@firebase/firestore"
import { useEffect, useState } from "react"

function App() {
    const [posts, setPosts] = useState<Array<DocumentData>>([])
    useEffect(() => {
        async function getPosts() {
            try {
                const res = await fetch("/api/getPosts")
                const data = await res.json()
                setPosts(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPosts()
    }, [])
    return (
        <div className="App">
            <div className="flex justify-center gap-8 flex-wrap">
                {posts.map((post) => (
                    <Post
                        key={post.date.seconds}
                        author={post.author}
                        text={post.text}
                        title={post.title}
                        seconds={post.date.seconds}
                        avatarId={post.avatarId}
                    />
                ))}
            </div>
        </div>
    )
}

export default App
