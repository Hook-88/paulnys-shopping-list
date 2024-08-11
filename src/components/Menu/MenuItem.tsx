import React from "react"
import { twMerge } from "tailwind-merge"

type Props = {
    children: React.ReactNode,
    className?: string
    
}

export default function MenuItem({children, className}:Props) {
    const MenuItemClassName = twMerge(
        className
    )

    return (
        <li 
            className="
                px-4 py-1 text-nowrap text-base font-normal
                border-b border-white/30 last:border-none
            "
        >
            {children}
        </li>
    )
    
}