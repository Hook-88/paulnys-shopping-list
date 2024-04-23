import { useContext, } from "react"
import { MenuContext } from "./Menu"

export default function MenuButton({children, ...rest}) {
    const {open, toggleOpen, menuButtonRef } = useContext(MenuContext)

    return (
        <button 
            {...rest}
            ref={menuButtonRef}
            onClick={toggleOpen}
        >
            {typeof children === "function" ? children(open) : children}
        </button>
    )
}