import { RiDeleteBin6Fill } from "react-icons/ri"
import { FaRegSquare } from "react-icons/fa6"
import Button from "../Button/Button"
import ItemsList from "../ItemsList/Index"
import css from "./ShoppingList.module.css"

export default function ShoppingList({items}) {

    return (
        <ItemsList>
            {
                items.map(item => (
                    <ItemsList.Item key={item.id}>
                        <FaRegSquare className={css.icon}/>
                        <span className={css.span}>
                            {item.name}
                        </span>
                        <Button className={css.button}>
                            <RiDeleteBin6Fill />
                        </Button>

                    </ItemsList.Item>
                ))
            }

            
        </ItemsList>
    )
    
}