import React, { createContext, useState } from "react"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"

type Props = {
    children : React.ReactNode
}

const MenuContext = createContext({})

export default function Menu({children}: Props): React.ReactElement {
    const [open, setOpen] = useState(false)

    function openMenu(value: boolean) : void {
        setOpen(value)
    }
    
    return (
        <MenuContext.Provider value={{
            open,
            openMenu
        }}>
            <div className="relative">
                {children}
            </div>
        </MenuContext.Provider>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem

export { MenuContext }