import ItemsList from "../../ItemsList/Index"
import { ShoppingListContext } from "../../../pages/ShoppingListPage"
import { useContext, useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { FaRegSquare } from "react-icons/fa6"
import { FaCheckSquare } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import Button from "../../Button/Button"
import Form from "../../Form/Form"
import TextInput from "../../TextInput/TextInput"
import css from "./ShoppingListItem.module.css"
import useToggle from "../../../hooks/useToggle"
import getFirstLetterCap from "../../../utility/getFirstLetterCap"

export default function ShoppingListItem({item}) {
    const { toggleChecked, deleteItem, updateItemName } = useContext(ShoppingListContext)
    const [formData, setFormData] = useState(item.name)
    const [editItem, toggleEditItem] = useToggle(false)

    function handleEdit(event) {
        event.stopPropagation()
        toggleEditItem()
    }

    function handleDelete(event) {
        event.stopPropagation()
        deleteItem(item.id)
    }

    function handleChange(event) {
        setFormData(event.target.value)
    }

    function handleSubmit() {
        updateItemName(item.id, formData)
        toggleEditItem()
    }
    
    return (
        <ItemsList.Item 
            key={item.id}
            onClick={() => toggleChecked(item.id)}
        >
            {
                !editItem && 
                    <div>
                        {   
                            !item.checked ? 
                                <FaRegSquare className={css.icon}/> :
                                <FaCheckSquare className={css.icon} />
                        }
                    </div>
                 
            }
            {
                !editItem ? 
                    <span className={!item.checked ? css.span : css.spanChecked}>
                        {getFirstLetterCap(item.name)}
                    </span> :
                    <Form className={css.form} onSubmit={handleSubmit}>
                        <TextInput 
                            className={css.input}
                            onChange={handleChange}
                            value={formData ? getFirstLetterCap(formData) : ""}
                            autoFocus
                            onClick={e => e.stopPropagation()}
                        />
                    </Form>

            }
            {
                !item.checked ? 
                    <Button className={css.button} onClick={handleEdit}>
                        <MdEdit />
                    </Button> :
                    <Button 
                        className={css.button}
                        onClick={handleDelete}
                    >
                        <RiDeleteBin6Fill />
                    </Button> 
            }
        </ItemsList.Item>
)
}