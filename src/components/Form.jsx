import { useState } from "react"
import { shoppingListCollection } from "../firebase"
import { addDoc } from "firebase/firestore"

export default function Form(props) {
  const {handleChange, formData, addNewItemToShoppingList} = props

  return (
    <form
      style={
        {
          display: "grid",
          gap: ".6em"
        }
      }
      onSubmit={addNewItemToShoppingList}
    >
      <input 
        type="text"
        placeholder="Enter item for shopping list..."
        name="name" 
        onChange={handleChange}
        value={formData.hasOwnProperty("name") ? formData.name : ""}
        required
      />
      <button
        disabled={!formData.hasOwnProperty("name") || formData.name.length === 0}
      >Add to shopping list</button>
    </form>
  )
}