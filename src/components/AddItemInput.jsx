import { useState } from "react"
import Form from "./Form"

export default function AddItemInput({addItemFunction = () => {}, confirmButton}) {
    const [formData, setFormData] = useState("")

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    function handleSubmit() {
        addItemFunction(formData)
        setFormData("")
    }

    return (
        <Form 
            className="grid"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                name=""
                className="bg-white/5 rounded-lg py-2 px-4 text-center font-bold"
                autoFocus
                placeholder="Item..."
                onChange={handleFormChange}
                value={formData}
                required 
            />

            {confirmButton}

        </Form>
    )
}