import Card from "../Card/Card"
import Form from "../Form/Form"
import TextInput from "../TextInput/TextInput"
import Button from "../Button/Button"
import { ShoppingListContext } from "../../pages/ShoppingListPage"
import css from "./AddNewItem.module.css"
import { useContext, useState } from "react"

export default function AddNewItem() {
    const {addItemToList} = useContext(ShoppingListContext)
    const [formData, setFormData] = useState("")

    function handleChange(event) {
        setFormData(event.target.value)
    }

    function handleSubmit() {
        addItemToList(formData)
        setFormData("")
    }
    
    return (
        <Card className={css.card}>
            <Form className={css.form} onSubmit={handleSubmit}>
                <TextInput 
                    placeholder="Gaseosa" 
                    className={css.input} 
                    newItem 
                    onChange={handleChange} 
                    value={formData}
                />
            </Form>
        </Card>
    )
}