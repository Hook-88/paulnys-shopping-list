import classNames from "classnames"
import css from "./Form.module.css"

export default function Form({children, onSubmit, className}) {
    const formClassName = classNames(
        css.form,
        className
    )

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit} className={formClassName}>
            {children}
        </form>
    )
    
}