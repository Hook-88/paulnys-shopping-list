import React from "react"

type Props = {
    children : React.ReactNode
}

export default function MenuDropdown({children}: Props): React.ReactElement {
    
    return (
        <ul 
            className="
                absolute border border-white/30 
                rounded backdrop-blur bg-black/10 text-right
                top-8 right-0
            "
        >
            {children}
        </ul>
    )
}