import { Link, useParams, useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"
import { FaPlus, FaAngleRight, FaCircle, FaRegCircle, FaCheck, FaAngleLeft } from "react-icons/fa6"
import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"
import ListItemNameRecipe from "../components/ListItemNameRecipe"
import Form from "../components/Form"
import useEffectOnUpdate from "../hooks/useEffectOnUpdate"
import Header from "../components/Header"
import Main from "../components/Main"


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
            <Header className="text-base">
                <button onClick={() => navigate("./..")} className="flex items-center text-lg">
                    <FaAngleLeft  />
                    Recipe
                </button>
                <h1
                    className="col-start-2 col-span-2 justify-self-center font-bold"
                >{recipe ? getCapString(recipe.name) + " (edit)" : "Loading"}</h1>
                <button 
                    className="flex items-center justify-self-end"
                    onClick={toggleAddIngredients}
                >
                    { addIngredients ? <FaCheck /> : <FaPlus />}
                </button>
            </Header>
            <Main>
                {
                    recipe ? 
                    <>
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
                    
                    <List itemsArray={recipe.ingredients}>
                        {
                            recipe.ingredients.map(ingredient => (
                                <Link key={ingredient.id} to={ingredient.id}>
                                    <List.Item itemObj={ingredient} >

                                        {getCapString(ingredient.name)}
                                        <span className="mr-3">
                                            <FaAngleRight />
                                        </span>
                                    </List.Item>
                                </Link>
                                ) 
                            )
                        }
                    </List> 
                    </> : "Loading..."
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

            </Main>
        </div>
    )
}