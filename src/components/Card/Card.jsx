import classNames from "classnames"
import css from "./Card.module.css"

export default function Card({children, className}) {
    const cardClassname = classNames(
        css.card,
        className
    )

    return (
        <div className={cardClassname}>
            {children}
        </div>
    )
}