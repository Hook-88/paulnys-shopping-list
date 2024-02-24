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
import { FaCaretDown } from "react-icons/fa6"
import { FaCaretUp } from "react-icons/fa6"
import useToggle from "../hooks/useToggle"

const ShoppingListContext = createContext()

export default function ShoppingListPage() {
    const [shoppingListItems, setShoppingListItems] = useState([])
    const [showButtons, setShowButtons] = useState(false)
    const [showAddItem, toggleAddITem] = useToggle(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(shoppingListCollection, (snapshot) => {
            //sync up with local state
            const itemArray = 
                snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                .sort((a, b) => b.dateAdded - a.dateAdded)
                .sort((a, b) => a.checked - b.checked)

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

    function deleteCheckedItems() {
        shoppingListItems.forEach(item => {
            if (item.checked) {
                deleteItem(item.id)
            }

        })
    }

    function uncheckItems() {
        shoppingListItems.forEach(item => {
            if (item.checked) {
                toggleChecked(item.id)
            }
        })
        
    }

    return (
        <>
            <PageHeader onClick={toggleAddITem}>
                <h2>Shopping list</h2>
                {
                    showAddItem ?
                        <FaCaretUp className={css.headerIcon}/>:
                        <FaCaretDown className={css.headerIcon}/>
                }
            </PageHeader>
            <ShoppingListContext.Provider value={{addItemToList, deleteItem, toggleChecked, updateItemName}}>
                <MainContent>
                    {
                        showAddItem && <AddNewItem />
                    }
                    {
                        shoppingListItems.length > 0 && <ShoppingList items={shoppingListItems}/>
                    }
                    {
                        showButtons &&
                        <div className={css.buttons}>
                            <Button variant="danger" onClick={deleteCheckedItems}>Delete checked</Button>
                            <Button variant="success"onClick={uncheckItems}>Uncheck checked</Button>
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