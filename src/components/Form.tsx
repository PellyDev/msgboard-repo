import { useState } from "react"
import { TtoastType } from "../App"

type TProps = {
    createToast: (msg: string, type: TtoastType) => void
}

export default function Form({ createToast }: TProps) {
    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [keyPhrase, setKeyPhrase] = useState("")
    const [text, setText] = useState("")

    // username needs to be between 3 and 15 characters
    const [userState, setUserState] = useState({
        isValid: false,
        isTouched: false,
    })
    // title needs to be between 3 and 20 characters
    const [titleState, setTitleState] = useState({
        isValid: false,
        isTouched: false,
    })
    // keyPhrase needs to be between 3 and 15 characters and contain at least one number
    const [keyPhaseState, setKeyPhaseState] = useState({
        isValid: false,
        isTouched: false,
    })
    // text needs to be between 10 and 255 characters
    const [textState, setTextState] = useState({
        isValid: false,
        isTouched: false,
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (
            userState.isValid &&
            titleState.isValid &&
            keyPhaseState.isValid &&
            textState.isValid
        ) {
            console.log("submitting form")
            handleReset()
        } else {
            setUserState((prev) => ({ ...prev, isTouched: true }))
            setTitleState((prev) => ({ ...prev, isTouched: true }))
            setKeyPhaseState((prev) => ({ ...prev, isTouched: true }))
            setTextState((prev) => ({ ...prev, isTouched: true }))
            console.log("error")
        }
    }

    function handleReset() {
        setUsername("")
        setTitle("")
        setKeyPhrase("")
        setText("")
        setUserState({ isValid: false, isTouched: false })
        setTitleState({ isValid: false, isTouched: false })
        setKeyPhaseState({ isValid: false, isTouched: false })
        setTextState({ isValid: false, isTouched: false })
    }

    function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
        if (e.target.value.length >= 3 && e.target.value.length <= 15) {
            setUserState((prev) => ({ ...prev, isValid: true }))
        } else {
            setUserState((prev) => ({ ...prev, isValid: false }))
        }
    }

    function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
        if (e.target.value.length >= 3 && e.target.value.length <= 20) {
            setTitleState((prev) => ({ ...prev, isValid: true }))
        } else {
            setTitleState((prev) => ({ ...prev, isValid: false }))
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
            setKeyPhaseState((prev) => ({ ...prev, isValid: true }))
        } else {
            setKeyPhaseState((prev) => ({ ...prev, isValid: false }))
        }
    }

    function handleText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value)
        if (e.target.value.length >= 10 && e.target.value.length <= 255) {
            setTextState((prev) => ({ ...prev, isValid: true }))
        } else {
            setTextState((prev) => ({ ...prev, isValid: false }))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control max-w-lg mx-auto pt-12">
                <label htmlFor="username" className="label">
                    <span className="label-text">Username</span>
                </label>
                <input
                    id="username"
                    value={username}
                    onChange={handleUsername}
                    onBlur={() =>
                        setUserState((prev) => ({ ...prev, isTouched: true }))
                    }
                    placeholder="Your name..."
                    className={`input input-bordered ${
                        userState.isTouched && !userState.isValid
                            ? "input-error"
                            : ""
                    } focus:outline-accent`}
                    type="text"
                />
                <label
                    htmlFor="username"
                    className={`label ${
                        (!userState.isTouched || userState.isValid) &&
                        "invisible"
                    }`}
                >
                    <span className="label-text text-error">
                        Your username has to be between 3 and 15 characters
                    </span>
                </label>
                <label htmlFor="title" className="label ">
                    <span className="label-text">Title</span>
                </label>
                <input
                    id="title"
                    value={title}
                    onChange={handleTitle}
                    onBlur={() =>
                        setTitleState((prev) => ({ ...prev, isTouched: true }))
                    }
                    placeholder="Title for your post..."
                    className={`input input-bordered ${
                        titleState.isTouched && !titleState.isValid
                            ? "input-error"
                            : ""
                    } focus:outline-accent`}
                    type="text"
                />
                <label
                    htmlFor="title"
                    className={`label ${
                        (!titleState.isTouched || titleState.isValid) &&
                        "invisible"
                    }`}
                >
                    <span className="label-text text-error">
                        Your title needs to be between 3 and 20 characters
                    </span>
                </label>
                <label htmlFor="keyPhrase" className="label ">
                    <span className="label-text">Keyphrase</span>
                    <svg
                        onClick={() =>
                            createToast(
                                "You need to set a keyphrase to be able to delete your post in the future.",
                                "info"
                            )
                        }
                        className="label-text-alt w-6 cursor-pointer"
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="fill-slate-400"
                            d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
                            fillRule="nonzero"
                        />
                    </svg>
                </label>
                <input
                    id="keyPhrase"
                    value={keyPhrase}
                    onChange={handleKeyPhrase}
                    onBlur={() =>
                        setKeyPhaseState((prev) => ({
                            ...prev,
                            isTouched: true,
                        }))
                    }
                    placeholder="Your secret keyphrase to delete the post..."
                    className={`input input-bordered ${
                        keyPhaseState.isTouched && !keyPhaseState.isValid
                            ? "input-error"
                            : ""
                    } focus:outline-accent`}
                    type="password"
                />
                <label
                    htmlFor="keyPhrase"
                    className={`label ${
                        (!keyPhaseState.isTouched || keyPhaseState.isValid) &&
                        "invisible"
                    }`}
                >
                    <span className="label-text text-error">
                        Your keyphrase needs to be between 3 and 15 characters
                        and contain at least one number
                    </span>
                </label>
                <label htmlFor="title" className="label ">
                    <span className="label-text">Text</span>
                </label>
                <textarea
                    id="text"
                    value={text}
                    onChange={handleText}
                    onBlur={() =>
                        setTextState((prev) => ({ ...prev, isTouched: true }))
                    }
                    placeholder="Don't be shy, tell me what you think..."
                    className={`textarea  textarea-bordered ${
                        textState.isTouched && !textState.isValid
                            ? "textarea-error"
                            : ""
                    } focus:outline-accent`}
                />
                <label
                    htmlFor="text"
                    className={`label ${
                        (!textState.isTouched || textState.isValid) &&
                        "invisible"
                    }`}
                >
                    <span className="label-text text-error">
                        Your text needs to be between 10 and 255 characters
                    </span>
                </label>
                <div className="flex w-full justify-between">
                    <button
                        type="submit"
                        className="btn btn-primary w-1/3 mt-4"
                    >
                        submit
                    </button>
                    <button
                        type="reset"
                        onClick={handleReset}
                        className="btn btn-outline btn-secondary w-1/3 mt-4"
                    >
                        reset form
                    </button>
                </div>
            </div>
        </form>
    )
}
