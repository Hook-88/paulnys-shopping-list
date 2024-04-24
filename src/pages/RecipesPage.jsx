import { Link } from "react-router-dom"
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

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const unSub = onSnapshot(recipesCollection, snapshot => {
            //sync with local state
            const recipesArray = snapshot.docs.map(
                recipe => (
                    {
                        ...recipe.data(),
                        id: recipe.id
                    }
                )
            )

            setRecipes(recipesArray)
        })
        //preventing memory leak
        return unSub
    },[])

    return (
        <div>
            <header className="ml-11 text-2xl py-2 text-center border-b mb-2 flex items-center justify-between fixed top-0 inset-x-0">
                <h1>Recipes</h1>
                <Link to="/add-recipe" className="text-base pr-2 flex items-center justify-end">Add Recipe <FaAngleRight /></Link>
            </header>
            <main className="">
                {/* <ul className="space-y-2 mb-2">
                    {
                        recipes?.sort((a, b) => a.name.localeCompare(b.name))
                            .map(recipe => (
                            <li key={recipe.id}>
                                <Link to={recipe.id}>
                                    <Card>{recipe.name}</Card>
                                </Link>
                            </li>
                        ))
                    }
                </ul> */}
                <ul className="mt-12 mb-4 pl-11">
                    {
                        recipes?.sort((a, b) => a.name.localeCompare(b.name))
                            .map(recipe => (
                            <Link to={recipe.id} key={recipe.id}>
                                <li 
                                    key={recipe.id}
                                    className="text-lg border-b pt-2 pb-1 pr-4 flex justify-between items-center"
                                    >
                                    {recipe.name}
                                    <FaAngleRight />
                                </li>
                            </Link>
                        ))
                    }
                    <li></li>
                </ul>
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