


import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCiOT4ORaW1rXsB1AbY7WMK84t4HkClk6s",
  authDomain: "paulny-s-shoppinglist.firebaseapp.com",
  databaseURL: "https://paulny-s-shoppinglist-default-rtdb.firebaseio.com",
  projectId: "paulny-s-shoppinglist",
  storageBucket: "paulny-s-shoppinglist.appspot.com",
  messagingSenderId: "529149287147",
  appId: "1:529149287147:web:7e556477a6deab6b4b3cae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const shoppingListCollection = collection(db, "shopping-list")