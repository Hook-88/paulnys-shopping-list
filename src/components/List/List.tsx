import React from "react"
import ListBody from "./ListBody"
import ListHeader from "./ListHeader"
import ListProgress from "./ListProgress"


type Props = {
    children: React.ReactNode
}

export default function List({children}: Props) : React.ReactElement {
    
    return (
        <div>
            {children}
        </div>
    )
}

List.Header = ListHeader
List.Progress = ListProgress
List.Body = ListBody