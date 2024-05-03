import { FaPlus, FaAngleRight, FaCheck } from "react-icons/fa6"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import PageMain from "../components/PageMain"
import { createContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import ShoppingListPageHeader from "./ShoppingListPageHeader"
import addItemToFirebase from "../utility/addItemToFirebase"
import AddItemInput from "../components/AddItemInput"
import ShoppingListEl from "../components/ShoppingListEl"
import setAllPropsInFirebase from "../utility/setAllPropsInFirebase"
import deleteValuesInFirebase from "../utility/deleteValuesInFirebase"

const ShoppingListPageContext = createContext()

export default function ShoppingListPage() {
    const [shoppingList, setShoppipngList] = useState(null)
    const [showAddItem, setShowAddItem] = useState(false)
    const AddItemObj = {
        collectionName : "shoppingList", 
        docId : "MMy6fOXSXocRw3w7k7GR", 
        docProp: "items"
    }

    function toggleShowAddITem() {
        setShowAddItem(prev => !prev)
    }

    function addItem(value) {
        addItemToFirebase(AddItemObj, value)
    }

    function toggleCheckAllItems() {
        shoppingList?.items.some(item => item.checked === false) ?
            setAllPropsInFirebase(AddItemObj, "checked", true) :
            setAllPropsInFirebase(AddItemObj, "checked", false)
    }

    async function deleteCheckedItems() {
        deleteValuesInFirebase(AddItemObj, "checked", true)
    }

    useEffect(() => {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const unSub = onSnapshot(docRef, snapshot => {
            //sync with local state
            setShoppipngList(snapshot.data())
        })

        return unSub
    }, [])
    
    return (
        <ShoppingListPageContext.Provider 
            value={{
                showAddItem,
                shoppingList,
                toggleShowAddITem,
                AddItemObj
            }}
        >
            <div>
                <ShoppingListPageHeader />
                {
                    shoppingList ?
                    <PageMain>
                        {
                            shoppingList.items.length > 0 ?
                                <ShoppingListEl /> : 
                                !showAddItem ?
                                    <>
                                    <Button
                                        className="flex py-2 text-2xl justify-center"
                                        onClick={toggleShowAddITem}
                                        >
                                        <FaPlus />
                                    </Button>

                                    <PageLink>Recipes <FaAngleRight /></PageLink>
                                    </> : null 
                        }

                        { showAddItem && <AddItemInput addItemFunction={addItem}/> }

                        {
                            !showAddItem && shoppingList.items.length > 0 &&
                            <>
                                <Button 
                                    className="flex items-center justify-between"
                                    onClick={toggleCheckAllItems}
                                >
                                    {
                                        shoppingList?.items.some(item => item.checked === false) ?
                                            <>
                                            Check All <FaCheck /> 
                                            </>:
                                            "Uncheck All"
                                    }
                                </Button>

                                <PageLink>Recipes <FaAngleRight /></PageLink>

                                <Button 
                                    className="text-red-700 disabled:text-red-700/40"
                                    onClick={deleteCheckedItems}
                                    disabled={shoppingList?.items.every(item => item.checked === false)}
                                >
                                    Delete checked items
                                </Button>
                            </>
                        }

                    </PageMain> 
                    : 
                    <PageMain>
                        Loading...
                    </PageMain>
                }

            </div>
        </ShoppingListPageContext.Provider>
    )
}

export { ShoppingListPageContext }