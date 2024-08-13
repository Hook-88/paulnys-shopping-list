import { twMerge } from "tailwind-merge"

type Props = {
    children: string | JSX.Element
    className: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    type?: "button" | "submit"
}

export default function Button({children, className, onClick, type}: Props) : JSX.Element {
    const ButtonClasseName = twMerge(
        "border border-white/30 px-2 py-1 rounded",
        className
    )
    
    return (
        <button 
            className={ButtonClasseName}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}