import classNames from "classnames"
import css from "./Button.module.css"

export default function Button({children, className, onClick}) {
    const buttonClassName = classNames(
        css.button,
        className
    )

    return (
        <button className={buttonClassName} onClick={onClick}>{children}</button>
    )
    
}