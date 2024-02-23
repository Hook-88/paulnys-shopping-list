import ItemsList from "../../ItemsList/Index"
import { ShoppingListContext } from "../../../pages/ShoppingListPage"
import { useContext } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { FaRegSquare } from "react-icons/fa6"
import { FaCheckSquare } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import Button from "../../Button/Button"
import css from "./ShoppingListItem.module.css"

export default function ShoppingListItem({item}) {
    const { toggleChecked, deleteItem } = useContext(ShoppingListContext)

    function handleEdit(event) {
        event.stopPropagation()
    }

    function handleDelete(event) {
        event.stopPropagation()
        deleteItem(item.id)
    }
    
    return (
        <ItemsList.Item 
            key={item.id}
            onClick={() => toggleChecked(item.id)}
        >
            {
                !item.checked ? 
                    <FaRegSquare className={css.icon}/> :
                    <FaCheckSquare className={css.icon} />
            }
            
            <span className={!item.checked ? css.span : css.spanChecked}>
                {item.name}
            </span>

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