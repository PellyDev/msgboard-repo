import Post from "./components/Post"
import { DocumentData } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Form from "./components/Form"
import Toast from "./components/Toast"

export type TtoastType = "info" | "success" | "error"

function App() {
    const [posts, setPosts] = useState<Array<DocumentData>>([])
    const [showToast, setShowToast] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
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

    function onPostCreated(post: DocumentData) {
        setPosts((prev) => [post, ...prev])
    }

    function onPostDeleted(id: string) {
        setPosts((prev) => prev.filter((post) => post.id !== id))
    }

    useEffect(() => {
        async function getPosts() {
            setIsLoading(true)
            try {
                const res = await fetch("/api/getPosts")
                const data = await res.json()
                setPosts(data.data)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPosts()
    }, [])
    return (
        <div className="App">
            <div className="flex justify-center gap-8 flex-wrap">
                {isLoading && (
                    <div
                        className="mt-8 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
                )}
                {posts &&
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            author={post.author}
                            text={post.text}
                            title={post.title}
                            seconds={post.date.seconds}
                            avatarId={post.avatarId}
                            createToast={createToast}
                            onPostDeleted={onPostDeleted}
                        />
                    ))}
            </div>
            <Form createToast={createToast} onPostCreated={onPostCreated} />
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
