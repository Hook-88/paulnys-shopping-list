import React from "react"
import MenuButton from "./MenuButton"

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