import { useState } from "react"

type TProps = {
    title: string
    id: string
}

export default function DeleteModal(props: TProps) {
    const [keyphrase, setKeyphrase] = useState("")
    const { id, title } = props

    function isValidKeyphrase(keyphrase: string) {
        return keyphrase.length >= 3 && /\d/.test(keyphrase)
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
                            Your keyphrase is between 3 and 15 characters and
                            contains at least 1 number.
                        </span>
                    </label>
                    <label
                        htmlFor={`delete-${id}`}
                        className={`btn btn-outline ${
                            isValidKeyphrase(keyphrase)
                                ? "btn-secondary"
                                : "btn-disabled"
                        } px-8 mt-2 self-end`}
                    >
                        delete
                    </label>
                </label>
            </label>
        </>
    )
}
