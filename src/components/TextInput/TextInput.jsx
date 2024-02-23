import classNames from "classnames"
import css from "./TextInput.module.css"

export default function TextInput({newItem, className, ...rest}) {
    const inputClassname = classNames(
        css.input,
        className,
        {[css.newItem] : newItem}
    )

    return (
        <input type="text" {...rest} className={inputClassname}/>
    )
}