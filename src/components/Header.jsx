import { twMerge } from "tailwind-merge"

export default function Header({children, className, ...rest}) {
    const headerCSS = twMerge(
        "z-10 text-lg py-2 grid grid-cols-4 items-center justify-between fixed top-0 inset-x-0 px-4 backdrop-blur-md bg-black/90",
        className
    )
    
    return (
        <header 
            className={headerCSS}
            {...rest}
        >
            {children}
        </header>
    )
}