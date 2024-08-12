import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
    item: Item
}

type Item = {
    name: string
    quantity: number
    selected: boolean
}

export default function CardItemDefault({item}: Props): React.JSX.Element {
    
    return (
        <Card className="flex">
            { item.name }
            { item.quantity > 1 && ` (${item.quantity}x)` }
            <div className="flex ml-auto gap-2">
                {
                    item.quantity > 1 && (
                        <Button className="p-1 bg-orange-900">
                            <FaMinus />
                        </Button>
                    )
                }
                <Button className="p-1 bg-sky-900">
                    <FaPlus />
                </Button>
            </div>

        </Card>
    )
}