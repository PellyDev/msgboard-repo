export default function Form() {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                alert("form sent!")
            }}
        >
            <div className="form-control max-w-lg mx-auto pt-12">
                <label htmlFor="username" className="label">
                    Username
                </label>
                <input
                    id="username"
                    placeholder="Your name..."
                    className="input input-bordered focus:outline-primary"
                    type="text"
                />
                <label htmlFor="title" className="label pt-4">
                    Title
                </label>
                <input
                    id="title"
                    placeholder="Title for your post..."
                    className="input input-bordered focus:outline-primary"
                    type="text"
                />
                <label htmlFor="title" className="label pt-4">
                    Text
                </label>
                <textarea
                    id="title"
                    placeholder="Don't be shy, tell me what you think..."
                    className="textarea textarea-bordered h-36 focus:outline-primary"
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
