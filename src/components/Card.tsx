import React from "react"
import { twMerge } from "tailwind-merge"

type Props = {
    children: React.ReactNode
    className?: string
}

export default function Card({children, className}: Props): React.ReactElement {
    const CardClassName = twMerge(
        "bg-white/5 px-4 py-3 rounded",
        className
    )

    return (
        <div className={CardClassName}>
            {children}
        </div>
    )
    
}