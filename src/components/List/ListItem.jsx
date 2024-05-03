import { twMerge } from "tailwind-merge"

export default function ListItem({children, className, ...rest}) {
    const liCSS = twMerge(
        "py-2 pr-4 cursor-pointer",
        className
    )

    return (
        <li
            className={liCSS}
            {...rest}
        >
            {children}
        </li>
    )
    
}