import React from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type Props = {
    children: React.ReactNode,
    className?: string,
    itemType: "link" | "button"
    to?: string
    
}

export default function MenuItem({children, className, itemType, to = ""}: Props): React.ReactElement {
    const MenuItemClassName = twMerge(
        "px-4 py-1 grid text-nowrap text-right text-base w-full h-full font-normal",
        className
    )

    let MenuItemContent: React.ReactElement;

    if (itemType === "button") {
        MenuItemContent = (
            <button className={MenuItemClassName}>
                {children}
            </button>
        )
    }

    if (itemType === "link") {
        MenuItemContent = (
            <Link 
                className={MenuItemClassName}
                to={to}
            >
                {children}
            </Link>
        )
    }

    return (
        <li className="border-b border-white/30 last:border-none">
            <button  className={MenuItemClassName}>
                {children}
            </button>
        </li>
    )
    
}