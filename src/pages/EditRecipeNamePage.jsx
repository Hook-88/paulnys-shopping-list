import { Link, useParams, useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft } from "react-icons/fa6"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"
import ListItemNameRecipe from "../components/ListItemNameRecipe"
import Form from "../components/Form"
import Header from "../components/Header"
import Main from "../components/Main"
import Button from "../components/Button"
import ConfirmModal from "../components/ConfirmModal"


export default function EditRecipeNamePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [formData, setFormData] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    async function saveName() {
        const docRef = doc(db, "recipes", id)

        await updateDoc(docRef, {name: formData.toLowerCase().trim()})
        const recipeDoc = await getDoc(docRef)
        setRecipe(recipeDoc.data())

    }

    async function deleteRecipe() {
        const docRef = doc(db, "recipes", id)
        navigate("/recipes")
        await deleteDoc(docRef)
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
            setFormData(recipe.name)
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
                            disabled={formData.toLowerCase() === recipe?.name}
                            >
                            Save Name
                        </button>
                    </Form> 

                    <Button
                        className="text-red-500 justify-center"
                        onClick={() => setShowConfirm(true)}
                    >
                        Delete recipe
                    </Button>
                    </> : <h1>Loading....</h1>
                }
            </Main>
            {
                showConfirm && 
                <ConfirmModal 
                    closeModalFunc={closeConfirmModal} 
                    confirmActionFunc={deleteRecipe} 
                    question="Are you sure you want to delete the recipe?"
                />
            }
        </div>
    )
}