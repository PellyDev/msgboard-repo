import React, { useEffect } from "react"
import { TtoastType } from "../App"

type TProps = {
    message: string
    type: TtoastType
    destroyToast: () => void
}

export default function Toast(props: TProps) {
    const TOAST_LIFETIME = 3000
    const { message, type, destroyToast } = props

    // destroy the toast after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            destroyToast()
        }, TOAST_LIFETIME)
        return () => clearTimeout(timer)
    }, [])

    // destroy the toast if user clicks anywhere inside the toast
    useEffect(() => {
        function clickHandler(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (target.closest(".alert")) destroyToast()
        }
        window.addEventListener("click", clickHandler)
        return () => window.removeEventListener("click", clickHandler)
    }, [])

    let svg = null
    if (type === "info") {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
        )
    } else if (type === "success") {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        )
    } else {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        )
    }

    const alertType = "alert-" + type

    return (
        <div
            className={`alert ${alertType} shadow-lg max-w-md fixed bottom-[10%] left-1/2 -translate-x-[50%]`}
        >
            <div>
                {svg}
                <span>{message}</span>
            </div>
        </div>
    )
}
