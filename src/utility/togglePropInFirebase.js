import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default async function togglePropInFirebase(AddItemObj, itemId, prop) {
    const {collectionName, docId, docProp} = AddItemObj
    const docRef = doc(db, collectionName, docId)
    const slDoc = await getDoc(docRef)

    const newSlArray = slDoc.data()[docProp].map(item => {
        if (item.id === itemId) {
            
            return {
                ...item,
                [prop]: !item[prop]
            }
        } else {

            return item
        }
    })

    await updateDoc(docRef, {[docProp]: newSlArray})
    
}