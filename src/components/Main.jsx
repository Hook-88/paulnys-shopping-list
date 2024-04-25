import { twMerge } from "tailwind-merge"

export default function Main({children, className, ...rest}) {
    const mainCSS = twMerge(
        "px-4 pb-4 mt-12 flex flex-col gap-4",    
        className
    )
    
    return (
        <main
            {...rest}
            className={mainCSS}
        >
            {children}
        </main>
    )
}