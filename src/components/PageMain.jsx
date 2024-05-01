import { twMerge } from "tailwind-merge"

export default function PageMain({children, className, ...rest}) {
    const headerCSS = twMerge(
        "px-4 grid gap-4 mt-12",
        className
    )

    return (
        <main 
            className={headerCSS}
            {...rest}
        >
            {children}
        </main>
    )
}