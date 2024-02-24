import { createContext, useEffect, useState } from "react"
import { onSnapshot, doc, addDoc, deleteDoc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { db, shoppingListCollection } from "../firebase"
import PageHeader from "../components/PageHeader/PageHeader"
import MainContent from "../components/MainContent/MainContent"
import PageFooter from "../components/PageFooter/PageFooter"
import AddNewItem from "../components/AddNewItem/AddNewItem"
import ShoppingList from "../components/ShoppingList/ShoppingList"
import Button from "../components/Button/Button"
import css from "./ShoppingListPage.module.css"
import useToggle from "../hooks/useToggle"

const ShoppingListContext = createContext()

export default function ShoppingListPage() {
    const [shoppingListItems, setShoppingListItems] = useState([])
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(shoppingListCollection, (snapshot) => {
            //sync up with local state
            const itemArray = 
                snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))

            setShoppingListItems(itemArray)
        })

        return unsubscribe
    },[])

    useEffect(() => {
        const itemChecked = shoppingListItems.some(item => item.checked === true)
        setShowButtons(itemChecked)
        
    }, [shoppingListItems])

    async function addItemToList(value) {
        const newItem = {
            name: value,
            checked: false,
            dateAdded: Date.now()
        }

        const docRef = await addDoc(shoppingListCollection, newItem)
    }

    async function deleteItem(itemId) {
        const docRef = doc(db, "shopping-list", itemId)

        await deleteDoc(docRef)
    }

    async function toggleChecked(itemId) {
        const docRef = doc(db, "shopping-list", itemId)
        //get snapshot of document
        const docSnap = await getDoc(docRef)

        await updateDoc(
            docRef, { 
                //toggle checked value
                checked: !docSnap.data().checked 
            }
        ) 
    }

    async function updateItemName(itemId, value) {
        const docRef = doc(db, "shopping-list", itemId)
        
        await updateDoc(docRef, { name: value})
    }

    return (
        <>
            <PageHeader>
                <h1>Here goes header</h1>
            </PageHeader>
            <ShoppingListContext.Provider value={{addItemToList, deleteItem, toggleChecked, updateItemName}}>
                <MainContent>
                    <AddNewItem />
                    {
                        shoppingListItems.length > 0 && <ShoppingList items={shoppingListItems}/>
                    }
                    {
                        showButtons &&
                        <div className={css.buttons}>
                            <Button variant="danger">Delete checked</Button>
                            <Button variant="success">Uncheck checked</Button>
                        </div>
                    }
                    

                </MainContent>
            </ShoppingListContext.Provider>
            <PageFooter>
                <small>Copyright sheit</small>
            </PageFooter>

        </>
    
    )
}

export { ShoppingListContext }