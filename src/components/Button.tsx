import { twMerge } from "tailwind-merge"

type Props = {
    children: string | JSX.Element
    className: string
}

export default function Button({children, className}: Props) : JSX.Element {
    const ButtonClasseName = twMerge(
        "border border-white/30 px-2 py-1 rounded",
        className
    )
    
    return (
        <button className={ButtonClasseName}>
            {children}
        </button>
    )
}