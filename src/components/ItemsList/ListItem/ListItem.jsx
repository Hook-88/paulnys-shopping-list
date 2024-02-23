import classNames from "classnames"
import css from "./ListItem.module.css"

export default function ListItem({children, className}) {
    const itemClassName = classNames(
        css.item,
        className
    )

    return (
        <li className={itemClassName}>{children}</li>
    )
}