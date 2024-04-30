import { useParams, useNavigate } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6"
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import Form from "../components/Form"
import Header from "../components/Header"
import Main from "../components/Main"
import Button from "../components/Button"
import ConfirmModal from "../components/ConfirmModal"

export default function EditIngredientPage() {
    const { id, ingredientId } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [formData, setFormData] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    async function saveName() {
        const docRef = doc(db, "recipes", id)
        const newIngredientArray = recipe.ingredients.map(ingredient => {
            if (ingredient.id === ingredientId) {
                
                return {
                    ...ingredient,
                    name: formData.toLowerCase().trim()
                }
            } else {

                return ingredient
            }
        })

        await updateDoc(docRef, {ingredients: newIngredientArray})
        const recipeDoc = await getDoc(docRef)
        // setRecipe(recipeDoc.data())

    }

    async function deleteRecipe() {
        const docRef = doc(db, "recipes", id)

        const newIngredientArray = recipe.ingredients.filter(ingredient => ingredient.id !== ingredientId)

        navigate(`/recipes/${id}/edit`)

        await updateDoc(docRef, {ingredients: newIngredientArray})


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

    useEffect(() => {
        if (recipe) {
            const ingredientObjArray = recipe.ingredients.filter(ingredient => ingredient.id === ingredientId)
            if (ingredientObjArray[0]) {
                setFormData(ingredientObjArray[0].name)
            }
            
        }

    }, [recipe])

    function closeConfirmModal() {
        setShowConfirm(false)
    }

    return (
        <div>
            <Header>
                <button onClick={() => navigate(-1)} className="flex items-center col-span-2">
                    <FaAngleLeft  />
                    Edit recipe
                </button>
            </Header>
            <Main>
                {
                    recipe ?
                    <>
                    <Form onSubmit={saveName}>
                        <input 
                            type="text"
                            placeholder="Ingredient"
                            className="bg-white bg-opacity-15 py-2 rounded-lg w-full text-xl text-center mb-4"
                            onChange={handleFormChange}
                            value={formData ? getCapString(formData) : ""} 
                        />
                        <button
                            className="bg-white bg-opacity-15 w-full py-2 rounded-lg pl-3 flex items-center justify-center disabled:text-gray-500"
                            disabled={
                                formData.toLowerCase() === recipe?.ingredients.filter(ingredient => ingredient.id === ingredientId)[0]?.name
                            
                            }
                        >
                            Save Name
                        </button>
                    </Form>

                    <Button
                        className="justify-center text-red-500"
                        onClick={() => setShowConfirm(true)}
                    >
                        Delete ingredient
                    </Button> 
                    </> : <h1>Loading....</h1>
                }
            </Main>
            {
                showConfirm &&
                <ConfirmModal 
                    question="Are you sure you want to delete the ingredient?"
                    closeModalFunc={closeConfirmModal}
                    confirmActionFunc={deleteRecipe}
                />
            }
        </div>
    )
}