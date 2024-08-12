import { FaEyeSlash } from "react-icons/fa6"
import PageBody from "../../components/PageBody"
import List from "../../components/List/List"
import CardItemDefault from "./CardItemDefault"
import CardItemSelected from "./CardItemSelected"
import { useContext } from "react"
import PageHeaderShoppingList from "./PageHeaderShoppingList"
import PageShoppingListProvider, { ShoppingListContext } from "./PageShoppingListProvider"
import { ShoppingListContextType } from "./PageShoppingListProvider"


export default function PageShoppingList(){
    const { dispatch, localShoppingList } = useContext<ShoppingListContextType | {}>(ShoppingListContext)

    function handleClickItem(itemId: string) {
        if (dispatch) {
            dispatch({
                type: "toggle_select",
                id: itemId
            })
        }
    }
    console.log(localShoppingList)

    return (
        <PageShoppingListProvider>
            <PageHeaderShoppingList />
            <PageBody>
                <List>
                    <List.Header>
                        <List.Progress />
                        <button className="flex items-center gap-1 text-xs">
                            Hide selected <FaEyeSlash />
                        </button>
                    </List.Header>
                    <List.Body>
                        {
                            localShoppingList &&

                            localShoppingList.map(item => {

                                return (
                                    <li 
                                        key={item.id}
                                        className="border rounded border-transparent"
                                        onClick={() => handleClickItem(item.id)}
                                    >
                                        {
                                            item.selected ? (
                                                <CardItemSelected item={item} />
                                            ) : <CardItemDefault item={item} />
                                        }
                                    </li>
                                )
                            })
                        }
                    </List.Body>
                </List>
                
            </PageBody>
        </PageShoppingListProvider>
    )
}