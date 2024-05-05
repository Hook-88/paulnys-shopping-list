import { twMerge } from "tailwind-merge"

export default function Button({children, className, ...rest}) {
    const buttonCSS = twMerge(
        "bg-white/10 rounded-lg py-2 px-4",
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