import { useEffect, useRef } from "react"

export default function useEffectOnUpdate(effectFuction, deps) {
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            effectFuction()
        }
    }, deps)
}