import React from "react"
import { twMerge } from "tailwind-merge"

type Props = {
    children: React.ReactNode
    className?: string
}

export default function MenuButton({children, className}: Props): React.ReactElement {
    const ButtonClassName = twMerge(
        "flex items-center justify-end w-full h-full pr-1",
        className
    )
    
    return (
        <button className={ButtonClassName}>
            {children}
        </button>
    )
}