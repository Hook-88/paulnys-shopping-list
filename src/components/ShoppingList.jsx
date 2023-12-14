import Item from "./Item"
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function ShoppingList(props) {
  const {children} = props
  const itemElArray = children.map(item => {
    return <Item key={item.name} handleCheck={toggleChecked}>{item}</Item>
  })

  async function toggleChecked(event) {
    const {id} = event.target
    const docRef = doc(db, "shopping-list", id)
    const docSnap = await getDoc(docRef)

    await updateDoc(docRef, {
      checked: !docSnap.data().checked
    })
  }

  async function deleteItem(event) {
    const {type, name} = event.target
    
    if (type === "button") {
      const docRef = doc(db, "shopping-list", name)
      await deleteDoc(docRef)
    }
  
  }

  return (
    <ul
      style={
        {
          padding: "0",
          listStyleType: "none",
          margin: "10px 0 0 0",
          display: "grid",
          gap: "10px"
        }
      }
      onClick={deleteItem}
    >
      {itemElArray}
    </ul>
  )
}