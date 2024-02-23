import css from "./Form.module.css"

export default function Form({children, onSubmit}) {

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            {children}
        </form>
    )
    
}