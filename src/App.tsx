import Post from "./components/Post"
import { DocumentData } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Form from "./components/Form"
import Toast from "./components/Toast"

export type TtoastType = "info" | "success" | "error"

function App() {
    const [posts, setPosts] = useState<Array<DocumentData>>([])
    const [showToast, setShowToast] = useState<boolean>(false)

    // props for Toast component, determines configuration of the toast
    const [toastProps, setToastProps] = useState<{
        msg: string
        type: TtoastType
    }>({ msg: "", type: "info" })

    function createToast(msg: string, type: TtoastType): void {
        setToastProps({ msg, type })
        setShowToast(true)
    }

    function destroyToast(): void {
        setShowToast(false)
    }

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
            <Form createToast={createToast} />
            {showToast && (
                <Toast
                    message={toastProps.msg}
                    type={toastProps.type}
                    destroyToast={destroyToast}
                />
            )}
        </div>
    )
}

export default App
