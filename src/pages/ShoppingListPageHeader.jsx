import { useContext } from "react"
import PageHeader from "../components/PageHeader"
import { ShoppingListPageContext } from "./ShoppingListPage"
import { FaCheck, FaPlus } from "react-icons/fa6"


export default function ShoppingListPageHeader() {
    const {
        showAddItem,
        shoppingList,
        toggleShowAddITem
    } 
        = useContext(ShoppingListPageContext)

    return (
        <PageHeader>
            <h1 className="col-start-2 col-span-4 justify-self-center">Shopping List</h1>
            {
                showAddItem || shoppingList?.items.length > 0 ?
                <button 
                    className="col-start-6 flex items-center justify-center text-xl"
                    onClick={toggleShowAddITem}
                >
                    {showAddItem ? <FaCheck /> : <FaPlus />}
                </button> : null
            }
        </PageHeader>
    )
}