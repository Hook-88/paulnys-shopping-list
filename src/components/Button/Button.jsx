import classNames from "classnames"
import css from "./Button.module.css"

export default function Button({children, className, onClick, variant}) {
    const buttonClassName = classNames(
        css.button,
        css[variant],
        className
    )

    return (
        <button className={buttonClassName} onClick={onClick}>{children}</button>
    )
    
}