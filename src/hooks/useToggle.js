import { useState } from "react"

export default function useToggle(initalValue = false) {
    const [on, setOn] = useState(initalValue)

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    return [on, toggle]
    
}