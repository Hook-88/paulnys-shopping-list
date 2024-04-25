import { Link, useParams, useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft } from "react-icons/fa6"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"
import ListItemNameRecipe from "../components/ListItemNameRecipe"
import Form from "../components/Form"
import useEffectOnUpdate from "../hooks/useEffectOnUpdate"


export default function EditRecipePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [addIngredients, setAddIngredients] = useState(false)
    const [formData, setFormData] = useState("")

    function toggleAddIngredients() {
        setAddIngredients(prev => !prev)
    }

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    async function addIngredient() {
        const docRef = doc(db, "recipes", id)
        const ingredientObj = {
            name: formData.toLowerCase().trim(),
            checked: false,
            id: nanoid()
        }
        const newIngredientsArray = [...recipe.ingredients, ingredientObj]

        await updateDoc(docRef, {ingredients: newIngredientsArray})
        setFormData("")
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

    useEffectOnUpdate(() => {
        if (recipe && recipe.ingredients.length === 0) {
            setAddIngredients(true)
        }

    },[recipe])

    return (
        <div>
            <header className="-z-10 text-lg py-2 grid grid-cols-4 items-center justify-between fixed top-0 inset-x-0 px-4">
                <button onClick={() => navigate(-1)} className="flex items-center">
                    <FaAngleLeft  />
                    Recipe
                </button>
                <h1
                    className="col-start-2 col-span-2 justify-self-center font-bold"
                >{recipe ? getCapString(recipe.name) : "Loading"}</h1>
                <button 
                    className="flex items-center justify-self-end"
                    onClick={toggleAddIngredients}
                >
                    { addIngredients ? <FaCheck /> : <FaPlus />}
                    {/* <FaAngleRight /> */}
                </button>
            </header>
            <main className="px-4 mt-12 flex flex-col gap-4">

                {
                    recipe &&
                    <List>
                        <Link to="name">
                            <ListItemNameRecipe>
                                {getCapString(recipe.name)}
                                <span className="mr-3">
                                    <FaAngleRight />
                                </span>
                            </ListItemNameRecipe>
                        </Link>
                    </List>
                }

                {   recipe ? 
                    <List itemsArray={recipe.ingredients}>
                        {
                            recipe.ingredients.map(ingredient => (
                                    <List.Item key={ingredient.id} itemObj={ingredient} >
                                        {getCapString(ingredient.name)}
                                        <span className="mr-3">
                                            <FaAngleRight />
                                        </span>
                                    </List.Item>
                                ) 
                            )
                        }
                    </List> : null
                }

                {
                    addIngredients &&
                    <Form onSubmit={addIngredient}>
                        <input 
                            type="text"
                            placeholder="Ingredient"
                            className="bg-white bg-opacity-15 py-2 rounded-lg w-full text-xl text-center"
                            autoFocus
                            onChange={handleFormChange}
                            value={formData ? getCapString(formData): ""} 
                        />
                    </Form>
                }

            </main>
        </div>
    )
}