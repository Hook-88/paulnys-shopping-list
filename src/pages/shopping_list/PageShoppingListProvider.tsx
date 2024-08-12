import { FaEyeSlash } from "react-icons/fa6"
import PageBody from "../../components/PageBody"
import List from "../../components/List/List"
import CardItemDefault from "./CardItemDefault"
import CardItemSelected from "./CardItemSelected"
import { createContext, useReducer } from "react"
import PageHeaderShoppingList from "./PageHeaderShoppingList"
import { shoppingList } from "../../data"


type Props = {
    children: React.ReactNode
}

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

type ShoppingListContextType = {
    localShoppingList: Item[]
    dispatch: React.Dispatch<ActionType>
}

const ShoppingListContext = createContext<ShoppingListContextType | {}>({})

export default function PageShoppingListProvider({children}: Props){
    const [localShoppingList, dispatch] = useReducer(reducer, shoppingList)

    function reducer(localShoppingList : Item[], action: ActionType) : Item[] | [] {
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

            case "delete_selection" : {

                return (
                    localShoppingList.filter(
                        item => item.selected === false
                    )
                )
            }

            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    console.log(localShoppingList)

    return (
        <ShoppingListContext.Provider value={{
            localShoppingList,
            dispatch
        }}>
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
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext }
export type {ShoppingListContextType}