import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6";
import Card from "../components/Card"

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

    return (
        <div>
            <header className="text-2xl py-2 text-center border-b mb-2">
                <h1>Recipes</h1>
            </header>
            <main className="px-2">
                <ul className="space-y-2 mb-2">
                    {
                        recipesArray.sort((a, b) => a.name.localeCompare(b.name))
                            .map(recipe => (
                            <li key={recipe.id}>
                                <Link to={recipe.id}>
                                    <Card>{recipe.name}</Card>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Card
                    className="grid p-0"
                >
                    <Link to="/add-recipe" className="py-2 px-2 flex justify-center items-center text-lg gap">Add Recipe <FaAngleRight /></Link>
                </Card>
            </main>
        </div>
    )
}