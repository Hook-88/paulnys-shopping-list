import { Link, Outlet } from "react-router-dom"

export default function App() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Main menu
            </h1>
            <Link to="recipes">Recipes</Link>
            <Link to="add-recipe">Add recipe</Link>
            <Link to="/">Shopping list</Link>
            <Outlet />
        </>
    )
}