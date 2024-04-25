import { Link, useNavigate } from "react-router-dom"
import { FaPlus, FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import List from "../components/List/Index"
import getCapString from "../utility/getCapString"
import Form from "../components/Form"
import Header from "../components/Header"
import Main from "../components/Main"
import Button from "../components/Button"

export default function RecipesPage() {
    const [formData, setFormData] = useState("")
    const navigate = useNavigate()

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    async function addRecipe() {
        const docRef = await addDoc(recipesCollection, {name: formData.toLowerCase().trim(), ingredients: []})
        navigate(`/recipes/${docRef.id}/edit`)

    }

    return (
        <div>
            <Header>
                <Link to="/recipes" className="font-normal flex items-center justify-end justify-self-start"> <FaAngleLeft className="text-base"/>Recipes</Link>
                <h1 className="col-span-2 justify-self-center font-bold">Add new recipe</h1>
            </Header>
            <Main>
                <Form onSubmit={addRecipe}>
                    <input 
                        type="text"
                        placeholder="Name recipe"
                        className="bg-white bg-opacity-15 py-2 rounded-lg w-full text-xl text-center mb-4"
                        autoFocus
                        onChange={handleFormChange}
                        value={formData ? getCapString(formData) : ""}
                        required 
                    />
                    <Button
                        disabled={formData.length === 0}
                        className="justify-center"
                    >
                        Save Name
                    </Button>
                </Form>
            </Main>
        </div>
    )
}