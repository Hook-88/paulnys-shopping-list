import { createContext, useState, useRef } from "react"

const MenuContext = createContext()

export default function Menu({children, ...rest}) {
    const [open, setOpen] = useState(false)
    const menuButtonRef = useRef()

    function toggleOpen() {
        setOpen(prevOpen => !prevOpen)
    }
    
    return (
        <MenuContext.Provider value={{open, setOpen, toggleOpen, menuButtonRef}}>
            <div
                {...rest}
            >{children}</div>
        </MenuContext.Provider>
    )
}

export { MenuContext }