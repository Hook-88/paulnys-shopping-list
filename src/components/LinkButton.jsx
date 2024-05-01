import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

export default function LinkButton({className, children, ...rest}) {
    const LinkCSS = twMerge(
        "bg-white bg-opacity-15 w-full py-2 rounded-lg flex px-3 items-center justify-between",
        className
    )

    return (
        <Link className={LinkCSS} {...rest}>
            {children}
        </Link>
    )
}