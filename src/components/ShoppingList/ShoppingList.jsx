import { RiDeleteBin6Fill } from "react-icons/ri"
import { FaRegSquare } from "react-icons/fa6"
import { FaCheckSquare } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import Button from "../Button/Button"
import ItemsList from "../ItemsList/Index"
import { ShoppingListContext } from "../../pages/ShoppingListPage"
import css from "./ShoppingList.module.css"
import { useContext } from "react"

export default function ShoppingList({items}) {
    const { deleteItem } = useContext(ShoppingListContext)

    return (
        <ItemsList>
            {
                items.map(item => (
                    <ItemsList.Item key={item.id}>
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
                                <Button className={css.button}>
                                    <MdEdit />
                                </Button> :
                                <Button 
                                    className={css.button}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    <RiDeleteBin6Fill />
                                </Button> 
                        }
                    </ItemsList.Item>
                ))
            }

            
        </ItemsList>
    )
    
}