import React from "react"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"

type Props = {
    children : React.ReactNode
}

export default function Menu({children}: Props): React.ReactElement {
    
    return (
        <div className="relative">
            {children}
        </div>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem