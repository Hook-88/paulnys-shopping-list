import { useContext, } from "react"
import { MenuContext } from "./Menu"

export default function MenuButton({children, ...rest}) {
    const { toggleOpen, menuButtonRef } = useContext(MenuContext)

    return (
        <button 
            {...rest}
            ref={menuButtonRef}
            onClick={toggleOpen}
        >{children}</button>
    )
}