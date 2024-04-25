import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft } from "react-icons/fa6"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
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
                    <Button>Add to Shopping List</Button>
                }
            </Main>
        </div>
    )
}