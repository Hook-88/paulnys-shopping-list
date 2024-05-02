import { twMerge } from "tailwind-merge"

export default function ListItem({children, className, ...rest}) {
    const liCSS = twMerge(
        "py-2 pr-4 cursor-pointer shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]",
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