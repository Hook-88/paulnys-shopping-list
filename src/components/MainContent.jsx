import Form from "./Form"
import ShoppingList from "./ShoppingList"
import ConfirmAllItemsModal from "./ConfirmAllItemsModal"
import { onSnapshot, doc, deleteDoc, addDoc } from "firebase/firestore"
import { shoppingListCollection, db } from "../firebase"
import { useState, useEffect } from "react"

export default function MainContent() {

  //state for form
  const [formData, setFormData] = useState({})

  //state for shopping list
  const [shoppingListItems, setShoppingListItems] = useState([])

  const allItemsChecked = shoppingListItems.every(item => item.checked === true)

  useEffect(() => {
    const unsubscribe = onSnapshot(shoppingListCollection, snapshot => {
      //convert snapshot to shoppingList format 
      const newItemsArray = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
      setShoppingListItems(newItemsArray)  
    })
    return unsubscribe
  }, [])

  function handleChange(event) {
    const {name, value} = event.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }


  async function addNewItemToShoppingList(event) {
    event.preventDefault()
    const isInShoppingListItemsArray = ( 
      shoppingListItems.some(item => (
        item.name === formData.name.toLowerCase()
        )
      )
    )

    if (!isInShoppingListItemsArray) {
      //create new item obj
      const newItem = {
        ...formData,
        name: formData.name.toLowerCase(),
        checked: false
      }
      //
      await addDoc(shoppingListCollection, newItem)
    }
    
    setFormData({})
  }


  function clearShoppingList(event) {
    event.preventDefault()

    shoppingListItems.forEach(item => {
      deleteItem(item.id)
    })
  }


  async function deleteItem(itemId) {
    // get reference to doc for deleteDoc function
    const docRef = doc(db, "shopping-list", itemId)
    await deleteDoc(docRef)
  }

  return (
    <main>
      <Form 
        handleChange={handleChange} 
        formData={formData}
        addNewItemToShoppingList={addNewItemToShoppingList}
      />
      <ShoppingList>{shoppingListItems}</ShoppingList>
      {allItemsChecked && shoppingListItems.length > 0 && <ConfirmAllItemsModal handleSubmit={clearShoppingList}/> }
    </main>
  )
}