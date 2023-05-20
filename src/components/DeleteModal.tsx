import { useRef, useState } from "react"
import { TtoastType } from "../App"

type TProps = {
    title: string
    id: string
    createToast: (msg: string, type: TtoastType) => void
    onPostDeleted: (id: string) => void
}

export default function DeleteModal(props: TProps) {
    const closeModalRef = useRef<HTMLLabelElement>(null)
    const [keyphrase, setKeyphrase] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { id, title, createToast, onPostDeleted } = props

    function isValidKeyphrase(keyphrase: string) {
        return keyphrase.length >= 3 && /\d/.test(keyphrase)
    }

    async function handleDelete() {
        setIsLoading(true)
        try {
            const res = await fetch("/api/deletePost", {
                method: "DELETE",
                body: JSON.stringify({ id, keyphrase }),
            })
            if (res.status === 200) {
                closeModalRef.current?.click()
                createToast("Post deleted successfully!", "success")
                onPostDeleted(id)
            } else {
                createToast("Invalid keyphrase! Please try again.", "error")
            }
        } catch {
            createToast("Something went wrong! Please try again.", "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <input
                type="checkbox"
                id={`delete-${id}`}
                className="modal-toggle"
            />

            <label htmlFor={`delete-${id}`} className="modal cursor-pointer">
                <label
                    className="modal-box relative flex flex-col gap-4"
                    htmlFor=""
                >
                    <h3 className="text-lg font-bold">
                        Delete <span className="text-primary">"{title}"</span>
                    </h3>
                    <p className="py-4">
                        Please enter your{" "}
                        <span className="font-bold">keyphrase</span> to delete
                        this post:
                    </p>
                    <input
                        id="keyphraseField"
                        value={keyphrase}
                        onChange={(e) => {
                            setKeyphrase((prev) => {
                                if (
                                    prev.length >= 15 &&
                                    e.target.value.length > prev.length
                                )
                                    return prev
                                return e.target.value
                            })
                        }}
                        type="password"
                        className="input input-bordered"
                    />
                    <label htmlFor="keyphraseField" className="label">
                        <span className="label-text">
                            Your keyphrase is between 3 and 15 characters long
                            and contains at least 1 number.
                        </span>
                    </label>
                    <button
                        className={`btn ${isLoading ? "" : "btn-outline"} ${
                            isValidKeyphrase(keyphrase)
                                ? "btn-secondary"
                                : "btn-disabled"
                        } px-8 mt-2 self-end`}
                        onClick={() => {
                            if (isLoading) return
                            handleDelete()
                        }}
                    >
                        {isLoading ? (
                            <div
                                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            "delete"
                        )}
                    </button>
                    <label
                        ref={closeModalRef}
                        className="invisible"
                        htmlFor={`delete-${id}`}
                    ></label>
                </label>
            </label>
        </>
    )
}
