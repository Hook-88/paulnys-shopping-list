import { RiDeleteBin6Fill } from "react-icons/ri"
import { FaRegSquare } from "react-icons/fa6"
import { FaCheckSquare } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import Button from "../Button/Button"
import ItemsList from "../ItemsList/Index"
import { ShoppingListContext } from "../../pages/ShoppingListPage"
import { useContext } from "react"
import ShoppingListItem from "./ShoppingListItem/ShoppingListItem"

export default function ShoppingList({items}) {
    const { deleteItem, toggleChecked } = useContext(ShoppingListContext)

    return (
        <ItemsList>
            {
                items.map(item => (
                    <ShoppingListItem item={item} key={item.id}/>
                ))
            }

            
        </ItemsList>
    )
    
}