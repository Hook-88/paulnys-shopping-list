import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft, FaCartShopping } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { createContext, useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"
import Header from "../components/Header"
import Main from "../components/Main"
import Button from "../components/Button"
import ConfirmModal from "../components/ConfirmModal"

const RecipePageContext = createContext()

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [showConfirmModal, setShowConformModal] = useState(false)

    async function toggleCheckItem(itemId) { 
        const docRef = doc(db, "recipes", id)
        const newIngredientsArray = recipe.ingredients.map(ingredient => {
            
            if (ingredient.id === itemId) {
                
                return {
                    ...ingredient,
                    checked: !ingredient.checked
                }
            } else {

                return ingredient
            }
        })
        
        await updateDoc(docRef, {ingredients : newIngredientsArray})
    }

    async function checkAllItems(checkValue) {
        const docRef = doc(db, "recipes", id)
        const newIngredientsArray = recipe.ingredients.map(ingredient => ({...ingredient, checked: checkValue}))

        await updateDoc(docRef, {ingredients : newIngredientsArray})
    }

    useEffect(() => {
        const docRef = doc(db, "recipes", id)
        const unsub = onSnapshot(docRef, snapshot => {
            const recipeObj = {
                ...snapshot.data(),
                id: snapshot.id
            }

            setRecipe(recipeObj)
        })

        return unsub 
    }, [])

    function handleClickToCheck() {
        recipe.ingredients.every(ingredient => ingredient.checked) ?
            checkAllItems(false) :
            checkAllItems(true)
    }

    async function addToShoppingList() {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const docSnap = await getDoc(docRef)
        const currentShoppingList = docSnap.data().items
        const itemsToAdd = 
            recipe.ingredients
                .filter(ingredient => {
                    return ingredient.checked === true
                })
                
                .map(ingredient => ({...ingredient, checked: false}))
        
        const newShoppingList = mergeArraysByProperty(currentShoppingList, itemsToAdd, "name")

        await updateDoc(docRef, {items : newShoppingList})
        

    }

    function mergeArraysByProperty(arr1, arr2, prop) {
        // Create an object to store unique objects based on the property
        let uniqueObjects = {}
    
        // Merge the arrays and filter out duplicates
        let mergedArray = arr1.concat(arr2).reduce((result, obj) => {
            if (!uniqueObjects[obj[prop]]) {
                uniqueObjects[obj[prop]] = true
                result.push(obj)
            }
            return result
        }, [])
    
        return mergedArray
    }

    function handleAddToShoppingList() {
        addToShoppingList()
        checkAllItems(false)
        setShowConformModal(false)
    }

    function closeConfirmModal() {
        setShowConformModal(false)
    }

    return (
        <RecipePageContext.Provider value={{closeConfirmModal}}>
            <div>
                <Header>
                    <Link to="/recipes" className="flex items-center" onClick={() => checkAllItems(false)}>
                        <FaAngleLeft  />
                        Recipes
                    </Link>
                    <h1
                        className="col-start-2 col-span-2 justify-self-center font-bold"
                    >
                        {recipe ? getCapString(recipe.name) : "Loading..."}
                    </h1>
                    <Link to="edit" className="flex items-center justify-self-end">
                        <FaRegEdit />
                    </Link>
                </Header>
                <Main>
                    {
                        recipe ?
                        <>
                        <List itemsArray={recipe.ingredients}>
                            {
                                recipe.ingredients.map(ingredient => (
                                    <List.ItemCheck key={ingredient.id} itemObj={ingredient} onClick={() => toggleCheckItem(ingredient.id)}>
                                            {getCapString(ingredient.name)}
                                        </List.ItemCheck>
                                    ) 
                                )
                            }
                        </List>

                        <Button
                            className="justify-between"
                            onClick={handleClickToCheck}
                        >
                            {recipe.ingredients.every(ingredient => ingredient.checked) ? "Uncheck all" : "Check all"}
                            {!recipe.ingredients.every(ingredient => ingredient.checked) ? <FaCheck /> : null}
                        </Button>

                        </>: "Loading...."
                    }
                    {
                        recipe?.ingredients.some(ingredient => ingredient.checked) &&
                        <Button onClick={() => setShowConformModal(true)}>Add to Shopping List</Button>
                    }

                    <Link to="/" className="bg-white bg-opacity-15 w-full py-2 rounded-lg flex px-3 gap-2 items-center justify-center disabled:text-gray-500">
                        Go to the shopping List
                        <FaCartShopping />
                    </Link>

                </Main>
                {
                    showConfirmModal && 
                        <ConfirmModal 
                            closeModalFunc={closeConfirmModal} 
                            confirmActionFunc={handleAddToShoppingList} 
                            question="Do you want to add these items?"
                        />
                }

                

            </div>
        </RecipePageContext.Provider>
    )
}

export { RecipePageContext }