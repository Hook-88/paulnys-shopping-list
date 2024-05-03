import { Link, useNavigate } from "react-router-dom"
import { FaPlus, FaAngleRight, FaCheck, FaAngleLeft, FaCartShopping } from "react-icons/fa6"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import PageMain from "../components/PageMain"
import { createContext, useEffect, useState } from "react"
import { doc, onSnapshot, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import ShoppingListPageHeader from "./ShoppingListPageHeader"
import addItemToFirebase from "../utility/addItemToFirebase"
import AddItemInput from "../components/AddItemInput"
import ShoppingListEl from "../components/ShoppingListEl"
import setAllPropsInFirebase from "../utility/setAllPropsInFirebase"
import deleteValuesInFirebase from "../utility/deleteValuesInFirebase"
import ConfirmModal from "../components/ConfirmModal"
import PageHeader from "../components/PageHeader"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import getCapString from "../utility/getCapedString"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)
    const [showAddItem, setShowAddItem] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unsub = onSnapshot(recipesCollection, snapshot => {
            const newRecipeArray = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setRecipes(newRecipeArray)
        })

        return unsub
    }, [])

    async function addRecipe(value) {
        const recipeObj = {
            name: value.toLowerCase(),
            ingredients: []
        }
        const docRef = await addDoc(recipesCollection, recipeObj)

        console.log(docRef.id)
        navigate(`/recipes/${docRef.id}/edit`)
    }
    
    return (
            <div>
                <PageHeader>
                    <h1 className="col-start-2 col-span-4 justify-self-center">Add new recipe</h1>
                </PageHeader>
                <PageMain>
                    <AddItemInput 
                        addItemFunction={addRecipe}
                        confirmButton={
                            <Button className="flex justify-center items-center gap-2 mt-4">
                                Add recipe
                                <FaCheck className="text-green-700"/>
                            </Button>
                        }
                    />
                    

                    <PageLink to="/recipes">Recipes <FaAngleRight /></PageLink>

                </PageMain>
            </div>
    )
}