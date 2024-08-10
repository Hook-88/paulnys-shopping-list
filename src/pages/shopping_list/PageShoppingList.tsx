import { FaEllipsis } from "react-icons/fa6";
import PageHeader from "../../components/PageHeader/PageHeader";

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
            <main>
                
            </main>
        </>
    )
}