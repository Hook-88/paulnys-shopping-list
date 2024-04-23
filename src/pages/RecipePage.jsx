import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"

const recipesArray = [
    {
        name: "tosti",
        id: "hdcbvyw37"
    }, 
    {
        name: "arepa",
        id: "ascbvedefeyw37"
    }
]

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

    console.log(id)


    return (
        <div>
            <header className="text-2xl py-2 text-center border-b mb-2 flex items-center justify-between">
                <h1>Recipe Name</h1>
            </header>
        </div>
    )
}