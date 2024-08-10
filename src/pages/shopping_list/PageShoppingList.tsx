import { FaEllipsis, FaEyeSlash } from "react-icons/fa6";
import PageHeader from "../../components/PageHeader/PageHeader";
import { shoppingList } from "../../data.ts"

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
                <div className="flex items-center justify-between">
                    <small>
                        (4/4) - Completed
                    </small>
                    <small className="flex items-center gap-1">
                        Hide selected <FaEyeSlash />
                    </small>
                </div>
                <ul>
                    {
                        shoppingList.map(item => (
                            <li key={item.id}>
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
                
            </main>
        </>
    )
}