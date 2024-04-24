export default function Form({children, onSubmit = () => {}}) {

    function handleSubmit(event) {
        event.prevetDefault()
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