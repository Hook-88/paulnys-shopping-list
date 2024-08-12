import React from "react";
import Card from "../../components/Card";
import { FaCheck } from "react-icons/fa6";

type Props = {
    item: Item
}

type Item = {
    name: string
    quantity: number
    selected: boolean
}

export default function CardItemSelected({item}: Props): React.JSX.Element {
    
    return (
        <Card className="flex bg-green-900">
            { item.name }
            { item.quantity > 1 && ` (${item.quantity}x)` }
            <span className="flex items-center justify-center ml-auto p-1 border border-transparent">
                <FaCheck />
            </span>
        </Card>
    )
}