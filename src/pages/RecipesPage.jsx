import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import List from "../components/List/Index"
import getCapString from "../utility/getCapString"

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
            <header className="-z-10 font-bold py-2 px-4 text-center mb-2 grid grid-cols-6 items-center fixed top-0 inset-x-0 bg-black">
                <Link to="/" className="text-sm font-normal flex items-center justify-end col-span-2 justify-self-start"> <FaAngleLeft className="text-base"/>Shopping List</Link>
                <h1 className="col-start-3 text-lg col-span-2 justify-self-center font-bold">Recipes</h1>
                <Link to="/add-recipe" className="col-start-6 text-xl font-normal flex items-center justify-end"><FaPlus /></Link>
            </header>
            <main className="mt-12 px-4">
                {   recipes ?    
                    <List itemsArray={recipes}>
                        {
                            recipes.map(recipe => (
                                    <Link key={recipe.id} to={recipe.id}>
                                    <List.ItemCheck  itemObj={recipe} >
                                        {getCapString(recipe.name)}
                                        <span className="mr-3">
                                            <FaAngleRight />
                                        </span>
                                    </List.ItemCheck>
                                    </Link>
                                ) 
                            )
                        }
                    </List> : null
                }
                
                
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