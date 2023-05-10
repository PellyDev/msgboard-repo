import Post from "./components/Post"
import { DocumentData } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Form from "./components/Form"
import Toast from "./components/Toast"

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
                        key={post.id}
                        id={post.id}
                        author={post.author}
                        text={post.text}
                        title={post.title}
                        seconds={post.date.seconds}
                        avatarId={post.avatarId}
                    />
                ))}
            </div>
            <Form />
            <Toast
                message="You need to set a keyphrase so you can delete your posts later."
                type="info"
            />
        </div>
    )
}

export default App
