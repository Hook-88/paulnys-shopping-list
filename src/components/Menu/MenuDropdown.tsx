import React, { useContext } from "react"
import { MenuContext } from "./Menu"
import { MenuContextType } from "./Menu"

type Props = {
    children : React.ReactNode
}

export default function MenuDropdown({children}: Props): React.ReactElement | null {
    const { open, openMenu }: MenuContextType = useContext(MenuContext)

    function handleClick() {
        if (openMenu) {
            openMenu(false)
        }
    }

    return (
        open ?
        <ul 
            onClick={handleClick}
            className="
                absolute border border-white/30 
                rounded backdrop-blur bg-black/10 text-right
                top-8 right-0
            "
        >
            {children}
        </ul> : null
    )
}