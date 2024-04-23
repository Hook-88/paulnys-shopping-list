import { useContext, useEffect, useRef } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children, className}) {
    const { open, setOpen, toggleOpen, menuButtonRef } = useContext(MenuContext)
    const menuRef = useRef()

    useEffect(() => {
        function handler(event) {
            if (menuRef.current) {
                if (event.target === menuButtonRef.current) {
                   
                    return 
                }

                if (event.target.contains(menuRef.current)) {
                    setOpen(false)
                }
            }
            
        }

        document.addEventListener("mousedown", handler)

    })
    
    return (
        open ? 
            <ul 
                className={className}
                ref={menuRef}
                onClick={toggleOpen}
            >
                {children}
            </ul> 
            : null
    )
}