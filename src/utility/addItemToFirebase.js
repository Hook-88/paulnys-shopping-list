import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { nanoid } from "nanoid"

export default async function addItemToFirebase(AddItemObj, value) {
        const {collectionName, docId, docProp} = AddItemObj

        const docRef = doc(db, collectionName, docId)
        const slDoc = await getDoc(docRef)
        const itemObj = {
            name: value.toLowerCase(),
            checked: false,
            id: nanoid()
        }
        const newSlArray = [...slDoc.data()[docProp], itemObj]

        await updateDoc(docRef, {[docProp]: newSlArray})


}