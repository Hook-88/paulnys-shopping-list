import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default async function deleteValuesInFirebase(AddItemObj, prop, value) {
    const {collectionName, docId, docProp} = AddItemObj
    const docRef = doc(db, collectionName, docId)
    const slDoc = await getDoc(docRef)

    const newSlArray = slDoc.data()[docProp].filter(item => item[prop] !== value)

    await updateDoc(docRef, {[docProp]: newSlArray})
    
}