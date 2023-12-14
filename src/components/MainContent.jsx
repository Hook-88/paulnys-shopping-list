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
    // no dependencies needed for onShaphot, only mount once
  }, [])

  // hande change for Form
  function handleChange(event) {
    const {name, value} = event.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  //add item to database 
  async function addNewItemToShoppingList(event) {
    //prevent submitting
    event.preventDefault()

    // check if user input is in current shoping ist
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
    //reset formdata
    setFormData({})
  }

  //to delete all items in firebase
  function clearShoppingList(event) {
    //prevent submitting
    event.preventDefault()

    shoppingListItems.forEach(item => {
      deleteItem(item.id)
    })
  }

  // tot delete item/doc based on ID
  async function deleteItem(itemId) {
    // get reference to doc for deleteDoc function
    const docRef = doc(db, "shopping-list", itemId)
   
    //use deleteDoc with the doc reference
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

      {
        allItemsChecked && 
        shoppingListItems.length > 0 
        && <ConfirmAllItemsModal handleSubmit={clearShoppingList}/>
      }
    </main>
  )
}