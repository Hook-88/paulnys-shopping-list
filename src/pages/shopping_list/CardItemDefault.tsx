import React, { useContext } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ShoppingListContextType, ShoppingListContext } from "./PageShoppingList";

type Props = {
    item: Item,
}
type Item = {
    name: string
    quantity: number
    selected: boolean
    id: string
}

export default function CardItemDefault({item}: Props): React.JSX.Element {
    const { dispatch } = useContext<ShoppingListContextType>(ShoppingListContext)

    function handleClickIncrement(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        if (dispatch) {
            dispatch({
                type: "increment_quantity",
                id: item.id
            })
        }
    }

    function handleClickDecrement(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        if (dispatch) {
            dispatch({
                type: "decrement_quantity",
                id: item.id
            })
        }
    }
    
    return (
        <Card className="flex">
            { item.name }
            { item.quantity > 1 && ` (${item.quantity}x)` }
            <div className="flex ml-auto gap-2">
                {
                    item.quantity > 1 && (
                        <Button 
                            className="p-1 bg-orange-900"
                            onClick={handleClickDecrement}
                        >
                            <FaMinus />
                        </Button>
                    )
                }
                <Button
                    onClick={handleClickIncrement} 
                    className="p-1 bg-sky-900"
                >
                    <FaPlus />
                </Button>
            </div>

        </Card>
    )
}