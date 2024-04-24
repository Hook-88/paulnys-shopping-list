import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"

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
            checked: true
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
            <main className="px-4 mt-16">

                <List itemsArray={recipeObj.ingredients}>
                    {
                        recipeObj.ingredients.map(ingredient => (<List.Item key={ingredient.id} itemObj={ingredient}>{ingredient.name}</List.Item>) )
                    }
                </List>

                <List itemsArray={recipeObj.ingredients}>
                    {
                        recipeObj.ingredients.map(ingredient => (
                                <List.ItemCheck key={ingredient.id} itemObj={ingredient}>
                                    {ingredient.name}
                                </List.ItemCheck>
                            ) 
                        )
                    }
                </List>

                <List itemsArray={recipeObj.ingredients}>
                    {
                        recipeObj.ingredients.map(ingredient => (
                                <List.ItemSelect key={ingredient.id} itemObj={ingredient}>
                                    {ingredient.name}
                                </List.ItemSelect>
                            ) 
                        )
                    }
                </List>


            </main>
        </div>
    )
}