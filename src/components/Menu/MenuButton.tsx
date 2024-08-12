import React, { useContext } from "react"
import { twMerge } from "tailwind-merge"
import { MenuContext } from "./Menu"
import { MenuContextType } from "./Menu"

type Props = {
    children: React.ReactNode
    className?: string
}

export default function MenuButton({children, className}: Props): React.ReactElement {
    const { open, openMenu }: MenuContextType = useContext(MenuContext)
    const ButtonClassName = twMerge(
        "flex items-center justify-end w-full h-full pr-1",
        className
    )

    function handleClick(): void {
        if (openMenu) {
            toggleOpen()

            return
        }

    }

    function toggleOpen() : void {
        if (openMenu) {
            if (open) {
                openMenu(false)
                return
            }
    
            openMenu(true)
            return
        }
    }
    
    return (
        <button
            onClick={handleClick} 
            className={ButtonClassName}
        >
            {children}
        </button>
    )
}