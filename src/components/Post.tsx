import avatar from "../assets/avatar.jpg"

export default function Post() {
    return (
        <div className="card w-6/12 shadow-xl">
            <div className="card-body gap-8">
                <div className="flex justify-between">
                    <h2 className="card-title">Post Title</h2>
                    <button className="btn btn-sm btn-square btn-outline btn-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="flex w-full text-gray-400 justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                <img className="" src={avatar} />
                            </div>
                        </div>
                        <p className=" font-semibold">Pelly</p>
                    </div>
                    <p className="w-fit flex-grow-0 font-semibold">
                        03/05/2023
                    </p>
                </div>
            </div>
        </div>
    )
}
