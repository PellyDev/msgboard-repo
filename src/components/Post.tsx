import avatar_1 from "../assets/avatar_1.png"
import avatar_2 from "../assets/avatar_2.png"
import avatar_3 from "../assets/avatar_3.png"
import { IPost } from "../interfaces/post"
import { TtoastType } from "../App"
import DeleteModal from "./DeleteModal"

type TProps = IPost & {
    createToast: (msg: string, type: TtoastType) => void
    onPostDeleted: (id: string) => void
}

export default function Post(props: TProps) {
    // mapping avatarId (queried from db) to avatar image
    const avatarMap: { [key: number]: string } = {
        0: avatar_1,
        1: avatar_2,
        2: avatar_3,
    }

    const {
        author,
        text,
        title,
        id,
        seconds,
        avatarId,
        createToast,
        onPostDeleted,
    } = props
    const formattedDate = new Date(seconds * 1000).toLocaleDateString()

    function deleteHandler() {
        // TODO: implement serverless function to delete post
    }
    return (
        <div className="card md:w-6/12 shadow-xl">
            <div className="card-body gap-8">
                <div className="flex justify-between">
                    <h2 className="card-title text-primary font-bold">
                        {title}
                    </h2>
                    <label
                        htmlFor={`delete-${id}`}
                        onClick={deleteHandler}
                        className="btn btn-sm btn-square btn-outline btn-secondary"
                    >
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
                    </label>
                    <DeleteModal
                        id={id}
                        title={title}
                        createToast={createToast}
                        onPostDeleted={onPostDeleted}
                    />
                </div>
                <p>{text}</p>
                <div className="flex w-full text-gray-400 justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img className="" src={avatarMap[avatarId]} />
                            </div>
                        </div>
                        <p className=" font-semibold">{author}</p>
                    </div>
                    <p className="w-fit flex-grow-0 font-semibold">
                        {formattedDate}
                    </p>
                </div>
            </div>
        </div>
    )
}
