import { useContext } from "react"
import { FaCheck } from "react-icons/fa6"
import { ShoppingListPageContext } from "../pages/ShoppingListPage"
import getCapString from "../utility/getCapedString"
import List from "./List/List"
import ListItem from "./List/ListItem"
import togglePropInFirebase from "../utility/togglePropInFirebase"

export default function ShoppingListEl() {
    const {shoppingList, AddItemObj} = useContext(ShoppingListPageContext)

    return (
        <List>
            {
                shoppingList.items.map((item, index, arr) => {
                    let classNameGen;

                    if (index !== arr.length - 1) {
                        classNameGen += " shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                    }

                    if (item.checked) {
                        classNameGen += " flex items-center justify-between text-white/20 line-through italic"
                    }

                    return (
                        <ListItem
                            key={item.id}
                            className={classNameGen}
                            onClick={() => togglePropInFirebase(AddItemObj, item.id, "checked")}
                        >
                            {getCapString(item.name)}
                            {item.checked ? <FaCheck /> : null}
                        </ListItem>
                    )

                })
            }
        </List>
    )
}