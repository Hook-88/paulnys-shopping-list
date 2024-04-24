export default function Form({children, onSubmit = () => {}}) {

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }
    
    return (
        <form
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    )
}