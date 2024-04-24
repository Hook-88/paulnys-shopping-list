import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft } from "react-icons/fa6"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"


export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

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

    async function checkItem(itemId, checkValue) {
        const docRef = doc(db, "recipes", id)

        const newIngredientsArray = recipe.ingredients.map(ingredient => {
            if (ingredient.id === itemId) {
                
                return {
                    ...ingredient,
                    checked: checkValue
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

    return (
        <div>
            <header className="-z-10 text-lg py-2 grid grid-cols-4 items-center justify-between fixed top-0 inset-x-0 px-4">
                <Link to="/recipes" className="flex items-center">
                    <FaAngleLeft  />
                    Recipes
                </Link>
                <h1
                    className="col-start-2 col-span-2 justify-self-center font-bold"
                >{recipe ? getCapString(recipe.name) : "Loading"}</h1>
                <Link to="/recipes" className="flex items-center justify-self-end">
                    <FaRegEdit />
                    {/* <FaAngleRight /> */}
                </Link>
            </header>
            <main className="px-4 mt-12 flex flex-col gap-4">

                {/* <List itemsArray={recipeObj.ingredients}>
                    {
                        recipeObj.ingredients.map(ingredient => (<List.Item key={ingredient.id} itemObj={ingredient}>{ingredient.name}</List.Item>) )
                    }
                </List> */}

                {   recipe ? 
                    <List itemsArray={recipe.ingredients}>
                        {
                            recipe.ingredients.map(ingredient => (
                                    <List.ItemCheck key={ingredient.id} itemObj={ingredient} onClick={() => toggleCheckItem(ingredient.id)}>
                                        {getCapString(ingredient.name)}
                                    </List.ItemCheck>
                                ) 
                            )
                        }
                    </List> : null
                }

                {/* <List itemsArray={recipe.ingredients}>
                    {
                        recipe.ingredients.map(ingredient => (
                                <List.ItemSelect key={ingredient.id} itemObj={ingredient}>
                                    {ingredient.name}
                                </List.ItemSelect>
                            ) 
                        )
                    }
                </List> */}

                    {
                        recipe?.ingredients.every(ingredient => ingredient.checked) ?
                        <button
                            className="bg-white bg-opacity-15 w-full py-2 rounded-lg pl-3 flex items-center justify-between"
                            onClick={() => checkAllItems(false)}
                            >
                            Uncheck All
                        </button> :

                        <button
                            className="bg-white bg-opacity-15 w-full py-2 rounded-lg pl-3 flex items-center justify-between"
                            onClick={() => checkAllItems(true)}
                        >
                            Check All
                            <span className="mr-3">  
                                <FaCheck />
                            </span>
                        </button>
                    }
                    

                    

                        {
                            recipe?.ingredients.some(ingredient => ingredient.checked) &&
                            <button
                                className="bg-white bg-opacity-15 w-full py-2 rounded-lg pl-3 flex items-center justify-between"
                            >
                                Add to Shopping List
                            </button>
                        }

            </main>
        </div>
    )
}