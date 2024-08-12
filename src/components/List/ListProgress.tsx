import React from "react";

type Props = {
    totalLength: number
    selectedLength: number
    completedText: string
}

export default function ListProgress({totalLength, selectedLength, completedText}: Props): React.ReactElement {
    
    return (
        <small>
            {`(${selectedLength}/${totalLength})`}
            {
                selectedLength === totalLength && ` - ${completedText}`
            }
        </small>
    )
}