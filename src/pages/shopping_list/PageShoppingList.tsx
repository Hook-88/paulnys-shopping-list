import { createContext, useReducer } from "react"
import { shoppingList } from "../../data"
import Page from "./Page"

type Item = {
    name: string
    quantity: number
    selected: boolean
    id: string
}

type ActionType = {
    type: string,
    id?: string
}

type ShoppingListContextType = {
    localShoppingList: Item[] | []
    dispatch?: React.Dispatch<ActionType>
}

const ShoppingListContext = createContext<ShoppingListContextType>({
    localShoppingList: [],
})

export default function PageShoppingListProvider(){
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

    return (
        <ShoppingListContext.Provider value={{
            localShoppingList,
            dispatch
        }}>
            
            <Page />
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext }
export type {ShoppingListContextType}