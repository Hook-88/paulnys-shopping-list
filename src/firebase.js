// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqg8vR91705IFo7jP8JEKGQsw4x1x5k3g",
  authDomain: "paulny-s-shopping-list.firebaseapp.com",
  projectId: "paulny-s-shopping-list",
  storageBucket: "paulny-s-shopping-list.appspot.com",
  messagingSenderId: "865469235906",
  appId: "1:865469235906:web:8f772d615893b664c9b15b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
export const recipesCollection = collection(db, "recipes")
export const shoppingListCollection = collection(db, "shoppingList")