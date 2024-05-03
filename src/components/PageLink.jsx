import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

export default function PageLink({children, className, ...rest}) {
    const LinkCSS = twMerge(
        "bg-white/5 rounded-lg py-2 px-4 flex items-center justify-between",
        className
    )

    
    return (
        <Link
            className={LinkCSS}
            {...rest}
        >
            {children}
        </Link>
    )
}