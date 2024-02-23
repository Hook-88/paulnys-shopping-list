import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaU84S9IsRL_8tM_MJKUCmKh_qXV_WkJ0",
  authDomain: "paulnys-shopping-list.firebaseapp.com",
  projectId: "paulnys-shopping-list",
  storageBucket: "paulnys-shopping-list.appspot.com",
  messagingSenderId: "788453288782",
  appId: "1:788453288782:web:46dfd84446f81c37948c1f"
}



// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const shoppingListCollection = collection(db, "shopping-list")
