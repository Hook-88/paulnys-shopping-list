import React from "react"

type Props = {
    children : React.ReactNode
}

export default function ListBody({children}: Props): React.ReactElement {
    
    return (
        <ul className="space-y-2">
            {children}
        </ul>
    )
}