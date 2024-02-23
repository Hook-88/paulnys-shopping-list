import { createContext, useEffect, useState } from "react"
import { onSnapshot, doc, addDoc, deleteDoc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { db, shoppingListCollection } from "../firebase"
import PageHeader from "../components/PageHeader/PageHeader"
import MainContent from "../components/MainContent/MainContent"
import PageFooter from "../components/PageFooter/PageFooter"
import AddNewItem from "../components/AddNewItem/AddNewItem"
import ShoppingList from "../components/ShoppingList/ShoppingList"

const ShoppingListContext = createContext()

export default function ShoppingListPage() {
    const [shoppingListItems, setShoppingListItems] = useState([])

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

    async function addItemToList(value) {
        const newItem = {
            name: value,
            checked: false,
            dateAdded: Date.now()
        }

        const docRef = await addDoc(shoppingListCollection, newItem)
        
    }

    return (
        <>
            <PageHeader>
                <h1>Here goes header</h1>
            </PageHeader>
            <ShoppingListContext.Provider value={{addItemToList}}>
                <MainContent>
                    <AddNewItem />
                    <ShoppingList items={shoppingListItems}/>

                </MainContent>
            </ShoppingListContext.Provider>
            <PageFooter>
                <small>Copyright sheit</small>
            </PageFooter>

        </>
    
    )
}

export { ShoppingListContext }