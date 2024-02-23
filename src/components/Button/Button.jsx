import classNames from "classnames"
import css from "./Button.module.css"

export default function Button({children, className}) {
    const buttonClassName = classNames(
        css.button,
        className
    )

    return (
        <button className={buttonClassName}>{children}</button>
    )
    
}