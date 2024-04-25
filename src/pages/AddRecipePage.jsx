import { Link, useNavigate } from "react-router-dom"
import { FaPlus, FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import List from "../components/List/Index"
import getCapString from "../utility/getCapString"
import Form from "../components/Form"

export default function RecipesPage() {
    const [formData, setFormData] = useState("")
    const navigate = useNavigate()

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    async function addRecipe() {
        const docRef = await addDoc(recipesCollection, {name: formData.toLowerCase().trim(), ingredients: []})
        navigate(`/recipes/${docRef.id}`)

    }

    return (
        <div>
            <header className="-z-10 font-bold py-2 px-4 text-center mb-2 grid grid-cols-4 items-center fixed top-0 inset-x-0">
                <Link to="/recipes" className="font-normal flex items-center justify-end justify-self-start"> <FaAngleLeft className="text-base"/>Recipes</Link>
                <h1 className="col-span-2 justify-self-center font-bold">Add new recipe</h1>
            </header>
            <main className="mt-12 px-4">
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
                    <button
                        className="bg-white bg-opacity-15 w-full py-2 rounded-lg pl-3 flex items-center justify-center disabled:text-gray-500"
                        disabled={formData.length === 0}
                    >
                        Save Name
                    </button>
                </Form>
                
                
                {/* {   recipes ?
                    <Card
                        className="grid p-0"
                    >
                        <Link to="/add-recipe" className="py-2 px-2 flex justify-center items-center text-lg gap">Add Recipe <FaAngleRight /></Link>
                    </Card> :
                    <Card>
                        <h1>Loading...</h1>
                    </Card>
                } */}
            </main>
        </div>
    )
}