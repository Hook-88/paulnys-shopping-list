import Item from "./Item"
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function ShoppingList(props) {
  const cssShoppingList = {
    padding: "0",
    listStyleType: "none",
    margin: "10px 0 0 0",
    display: "grid",
    gap: "10px"
  }
  const {children} = props
  
  //create array of itemsEl
  const itemElArray = children.map(item => {
    return (
      <Item 
        key={item.id} 
        handleCheck={toggleChecked}
      >
        {item}
      </Item>
    )
  })

  //function to toggleChecked in firebase
  async function toggleChecked(event) {
    const {id} = event.target

    //reference of doc in firebase
    const docRef = doc(db, "shopping-list", id)

    //snapshot of doc
    const docSnap = await getDoc(docRef)

    //toggle checked value in doc
    await updateDoc(docRef, {
      checked: !docSnap.data().checked
    })
  }

  // delete doc in firebase 
  async function deleteItem(event) {
    //name of button is set to ID of doc
    const {type, name} = event.target
    
    if (type === "button") {
      //ref for doc in databes
      const docRef = doc(db, "shopping-list", name)
      // delete doc
      await deleteDoc(docRef)
    }
  
  }

  return (
    <ul
      style={cssShoppingList}
      onClick={deleteItem}
    >
      {itemElArray}
    </ul>
  )
}