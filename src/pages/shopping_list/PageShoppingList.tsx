import { FaEyeSlash } from "react-icons/fa6"
import PageBody from "../../components/PageBody"
import { shoppingList } from "../../data.ts"
import List from "../../components/List/List.tsx"
import CardItemDefault from "./CardItemDefault.tsx"
import CardItemSelected from "./CardItemSelected.tsx"
import { useReducer } from "react"
import PageHeaderShoppingList from "./PageHeaderShoppingList.tsx"

type Item = {
    name: string
    quantity: number
    selected: boolean
    id: string
}

type ActionType = {
    type: string,
    id: string
}

export default function PageShoppingList(){
    const [localShoppingList, dispatch] = useReducer(reducer, shoppingList)

    function reducer(localShoppingList : Item[], action: ActionType) {
        switch (action.type) {
            case "toggle_select" : {
                
                return (
                    localShoppingList.map(
                        item => item.id === action.id ? 
                            {...item, selected: !item.selected} 
                            : item
                    )
                )
            }

            case "increment_quantity" : {

                return (
                    localShoppingList.map(
                        item => item.id === action.id ?
                            {...item, quantity: item.quantity + 1}
                            : item
                    )
                )
            }

            case "decrement_quantity" : {

                return (
                    localShoppingList.map(
                        item => item.id === action.id ?
                            {...item, quantity: item.quantity - 1}
                            : item
                    )
                )
            }

            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function handleClickItem(itemId: string) {
        dispatch({
            type: "toggle_select",
            id: itemId
        })
    }

    return (
        <>
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
                                            ) : <CardItemDefault item={item} dispatch={dispatch} />
                                        }
                                    </li>
                                )
                            })
                        }
                    </List.Body>
                </List>
                
            </PageBody>
        </>
    )
}