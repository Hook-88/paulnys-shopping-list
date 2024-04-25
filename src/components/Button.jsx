import { twMerge } from "tailwind-merge"

export default function Button({children, className, ...rest}) {
    const buttonCSS = twMerge(
        "bg-white bg-opacity-15 w-full py-2 rounded-lg flex px-3 items-center disabled:text-gray-500",
        className
    )

    return (
        <button
            className={buttonCSS}
            {...rest}
        >
            {children}
        </button>
    )
}