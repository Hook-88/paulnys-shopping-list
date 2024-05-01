import { twMerge } from "tailwind-merge"
import ListItem from "./ListItem"

export default function ListItemLast({children, className, ...rest}) {
    const liCSS = twMerge(
        "shadow-none",
        className
    )

    return (
        <ListItem
            className={liCSS}
            {...rest}
        >
            {children}
        </ListItem>
    )
    
}