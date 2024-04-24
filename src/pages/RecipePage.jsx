import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"

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
            <header className="-z-10 ml-11 text-2xl py-2 text-center border-b flex items-center justify-between fixed top-0 inset-x-0">
                <h1>Recipe Name</h1>
            </header>
            <main className="px-4">




                <ul className="mt-16 cursor-pointer bg-white bg-opacity-15 rounded-lg">
                    {
                        recipeObj.ingredients.map(ingredient => (
                            <li
                                key={ingredient.id} 
                                className="flex items-center pl-3"
                            >
                                {/* <button className="mr-3">
                                    <FaRegCircle />
                                </button> */}
                                <div
                                    className={`
                                        flex-grow py-2 flex justify-between items-center
                                        ${ingredient.id === recipeObj.ingredients[recipeObj.ingredients.length - 1].id ? 
                                            "" : "shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"} 
                                    `}
                                >
                                    {getCapString(ingredient.name)}
                                    {
                                        ingredient.checked &&
                                        <span className="mr-3">
                                            <FaCheck />
                                        </span>
                                        
                                    } 
                                </div>      
                            </li>
                        ))
                    }
                </ul>
            </main>
        </div>
    )
}