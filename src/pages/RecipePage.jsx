import PageHeader from "../components/PageHeader"
import { useParams } from "react-router-dom"

export default function RecipePage() {
    const { id } = useParams()
    
    console.log(id)

    return (
        <div>
            <PageHeader>
                <h1 className="col-start-2 col-span-4 justify-self-center">Name Recipe</h1>
                {/* {
                    showAddItem || shoppingList?.items.length > 0 ?
                    <button 
                        className="col-start-6 flex items-center justify-center text-xl"
                        onClick={toggleShowAddITem}
                    >
                        {showAddItem ? <FaCheck /> : <FaPlus />}
                    </button> : null
                } */}
            </PageHeader>
        </div>
    )
}