import { FaEllipsis, FaEyeSlash, FaMinus, FaPlus } from "react-icons/fa6"
import PageHeader from "../../components/PageHeader/PageHeader"
import { shoppingList } from "../../data.ts"
import Button from "../../components/Button.tsx"

export default function PageShoppingList(){
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>
                    Shopping List
                </PageHeader.Title>
                <button className="flex items-center justify-center">
                    <FaEllipsis />
                </button>
            </PageHeader>
            <main className="px-4 mt-4">
                <div className="flex items-center justify-between px-4 mb-1">
                    <small>
                        (4/4) - Completed
                    </small>
                    <small className="flex items-center gap-1">
                        Hide selected <FaEyeSlash />
                    </small>
                </div>
                <ul className="space-y-2">
                    {
                        shoppingList.map(item => (
                            <li key={item.id}>
                                <div className="bg-white/5 px-4 py-3 flex rounded">
                                    {item.name}
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

                                </div>
                            </li>
                        ))
                    }
                </ul>
                
            </main>
        </>
    )
}