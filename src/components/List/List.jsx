import { twMerge } from "tailwind-merge"

export default function List({children, className, ...rest}) {
    const ulCSS = twMerge(
        "bg-white/10 rounded-lg pl-4",
        className
    )
    
    return (
        <ul 
            className={ulCSS}
            {...rest}
        >
            {children}
        </ul>
    )
}