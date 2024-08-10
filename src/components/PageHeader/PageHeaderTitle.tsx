import React from "react"

type Props = {
    children: React.ReactNode 
}

export default function PageHeaderTitle({children} : Props): React.ReactElement {
    
    return (
        <h1 className="col-start-2 col-span-4 text-center">
            {children}
        </h1>
    )
}