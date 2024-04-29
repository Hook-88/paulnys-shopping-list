import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"
import Header from "../components/Header"
import Main from "../components/Main"
import Button from "../components/Button"

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

    return (
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
            </Main>
            {
                showConfirmModal &&
                <section className="flex fixed bg-white/30 backdrop-blur inset-0 items-center justify-center z-30">
                <ul className="cursor-pointer bg-[#262626] rounded-lg mx-4">
                    <li
                        className="flex items-center"
                    >
                        <div
                            className={`
                                flex-grow py-2 flex justify-center items-center
                                shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]
                                px-3
                            `}
                        >
                            Do yo want to add these items?
                        </div>      
                    </li>

                    <li
                        className="flex items-center px-3"
                    >
                        <button
                            className={`
                                flex-grow py-2 flex justify-center items-center
                                 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]
                                 gap-2
                            `}
                            onClick={handleAddToShoppingList}
                        >
                            Yes <FaCheck className="text-green-500"/>
                        </button>      
                    </li>

                    <li
                        className="flex items-center px-3"
                    >
                        <button
                            className={`
                                flex-grow py-2 flex justify-center items-center gap-2
                            `}
                            onClick={() => setShowConformModal(false)}

                        >
                            No
                            <span className="text-xl text-red-500">
                                <IoClose />
                            </span> 
                        </button>      
                    </li>
                </ul>
            </section>
            }

        </div>
    )
}