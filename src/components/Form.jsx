import { useState } from "react"
import { shoppingListCollection } from "../firebase"
import { addDoc } from "firebase/firestore"

export default function Form(props) {
  const {handleChange, formData, addNewItemToShoppingList} = props
  const cssForm = {
    display: "grid",
    gap: ".6em"
  }

  const cssButton = {
    fontSize: "1rem",
    padding: ".6em 0",
    backgroundColor: "#4a8290",
    border: "0px solid #2D5058",
    borderRadius: "3px",
    color: "#efeadd",
    textShadow: "0px 0px 1px black"
  }

  return (
    <form
      style={cssForm}
      onSubmit={addNewItemToShoppingList}
    >
      <input 
        type="text"
        placeholder="Enter item for shopping list..."
        name="name" 
        onChange={handleChange}
        value={formData.hasOwnProperty("name") ? formData.name : ""}
        required
        style={{fontSize: "1rem"}}
      />
      <button
        disabled={!formData.hasOwnProperty("name") || formData.name.length === 0}
        style={cssButton}
      >
        Add to shopping list
      </button>
    </form>
  )
}