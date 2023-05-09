import { useState } from "react"

export default function Form() {
    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [keyPhrase, setKeyPhrase] = useState("")
    const [text, setText] = useState("")

    // username needs to be between 3 and 15 characters
    const [isValidUsername, setIsValidUsername] = useState(false)
    // title needs to be between 3 and 20 characters
    const [isValidTitle, setIsValidTitle] = useState(false)
    // keyPhrase needs to be between 3 and 15 characters and contain at least one number
    const [isValidKeyPhrase, setIsValidKeyPhrase] = useState(false)
    // text needs to be between 10 and 255 characters
    const [isValidText, setIsValidText] = useState(false)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
        if (e.target.value.length >= 3 && e.target.value.length <= 15) {
            setIsValidUsername(true)
        } else {
            setIsValidUsername(false)
        }
    }

    function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
        if (e.target.value.length >= 3 && e.target.value.length <= 20) {
            setIsValidTitle(true)
        } else {
            setIsValidTitle(false)
        }
    }

    function handleKeyPhrase(e: React.ChangeEvent<HTMLInputElement>) {
        const regExp = /\d/
        setKeyPhrase(e.target.value)
        if (
            e.target.value.length >= 3 &&
            e.target.value.length <= 15 &&
            regExp.test(e.target.value)
        ) {
            setIsValidKeyPhrase(true)
        } else {
            setIsValidKeyPhrase(false)
        }
    }

    function handleText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value)
        if (e.target.value.length >= 10 && e.target.value.length <= 255) {
            setIsValidText(true)
        } else {
            setIsValidText(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control max-w-lg mx-auto pt-12">
                <label htmlFor="username" className="label">
                    Username
                </label>
                <input
                    id="username"
                    value={username}
                    onChange={handleUsername}
                    placeholder="Your name..."
                    className={`input input-bordered ${
                        !isValidUsername ? "input-error" : ""
                    } focus:outline-accent`}
                    type="text"
                />
                <label htmlFor="title" className="label pt-4">
                    Title
                </label>
                <input
                    id="title"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Title for your post..."
                    className="input input-bordered focus:outline-accent"
                    type="text"
                />
                <label htmlFor="keyPhrase" className="label pt-4">
                    Keyphrase
                </label>
                <input
                    id="keyPhrase"
                    value={keyPhrase}
                    onChange={handleKeyPhrase}
                    placeholder="Your secret keyphrase to delete the post..."
                    className="input input-bordered focus:outline-accent"
                    type="password"
                />
                <label htmlFor="title" className="label pt-4">
                    Text
                </label>
                <textarea
                    id="title"
                    value={text}
                    onChange={handleText}
                    placeholder="Don't be shy, tell me what you think..."
                    className="textarea textarea-bordered h-36 focus:outline-accent"
                />
                <div className="flex w-full justify-between">
                    <button
                        type="submit"
                        className="btn btn-primary w-1/3 mt-4 "
                    >
                        submit
                    </button>
                    <button
                        type="reset"
                        className="btn btn-outline btn-secondary w-1/3 mt-4 "
                    >
                        reset form
                    </button>
                </div>
            </div>
        </form>
    )
}
