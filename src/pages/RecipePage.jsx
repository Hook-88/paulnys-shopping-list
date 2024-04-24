import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"

const recipeObj = {
    name: "tosti",
    ingredients: [
        {
            id: "bxchds5",
            name: "kaas",
            checked: false
        },
        {
            id: "bxcaefdwefhds5",
            name: "brood",
            checked: false
        },
        {
            id: "caefdwefhds5",
            name: "ham",
            checked: false
        },
    ]
}

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)


    return (
        <div>
            <header className="ml-11 text-2xl py-2 text-center border-b mb-2 flex items-center justify-between fixed top-0 inset-x-0">
                <h1>Recipe Name</h1>
            </header>
            <main className="pl-11">
                <ul className="mt-12">
                    {
                        recipeObj.ingredients.map(ingredient => (
                            <li 
                                key={ingredient.id}
                                className="text-lg border-b pt-2 pb-1 pr-4"
                            >
                                {ingredient.name}
                            </li>
                        ))
                    }
                </ul>
            </main>
        </div>
    )
}