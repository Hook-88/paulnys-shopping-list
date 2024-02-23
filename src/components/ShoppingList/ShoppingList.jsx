import ItemsList from "../ItemsList/Index"
import css from "./ShoppingList.module.css"

export default function ShoppingList({items}) {

    return (
        <ItemsList>
            {
                items.map(item => (
                    <ItemsList.Item key={item.id}>
                        <span className={css.span}>
                            {item.name}
                        </span>
                    </ItemsList.Item>
                ))
            }

            
        </ItemsList>
    )
    
}