import { twMerge } from "tailwind-merge"

export default function PageHeader({children, className, ...rest}) {
    const headerCSS = twMerge(
        "text-lg font-bold grid grid-cols-6 py-2 mb-2",
        className
    )

    return (
        <header className={headerCSS}>
            {children}
        </header>
    )
}