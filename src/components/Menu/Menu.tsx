import React, { createContext, useEffect, useRef, useState } from "react"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"

type Props = {
    children : React.ReactNode
}
type MenuContextType = {
    open?: boolean
    openMenu?: (v: boolean) => void
}

const MenuContext = createContext<MenuContextType>({})

export default function Menu({children}: Props): React.ReactElement {
    const [open, setOpen] = useState(false)
    const MenuRef = useRef<HTMLDivElement>(null)

    function openMenu(value: boolean) : void {
        setOpen(value)
    }

    useEffect(() => {
        let handler = (event: MouseEvent) => {
            if (!MenuRef.current?.contains(event.target as Node)) {
                openMenu(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])
    
    return (
        <MenuContext.Provider value={{
            open,
            openMenu
        }}>
            <div 
                className="relative"
                ref={MenuRef}
            >
                {children}
            </div>
        </MenuContext.Provider>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem

export { MenuContext }
export type { MenuContextType }
