import Card from "../Card/Card"
import Form from "../Form/Form"
import TextInput from "../TextInput/TextInput"
import css from "./AddNewItem.module.css"

export default function AddNewItem() {
    
    return (
        <Card className={css.card}>
            <Form>
                <TextInput placeholder="Gaseosa" className={css.input} newItem/>
            </Form>
        </Card>
    )
}