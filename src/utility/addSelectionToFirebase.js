import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
// import { nanoid } from "nanoid"

export default async function addSelectionToFirebase(AddItemObj, selectionArray) {
    const {collectionName, docId, docProp} = AddItemObj
    
    //doc needs ref to database, name of collection and the id of the document
    const docRef = doc(db, collectionName, docId)
    //get current list
    const slDoc = await getDoc(docRef)
    const itemsToAddArray = selectionArray.map(item => ({
        name: item.name,
        id: item.id,
        checked: false 
    }))

    const newSlArray = [...slDoc.data()[docProp], ...itemsToAddArray]

    await updateDoc(docRef, {[docProp]: newSlArray})


}