import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6"
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
            <header className="-z-10 font-bold py-2 text-center mb-2 flex items-center justify-between fixed top-0 inset-x-0">
                <Link to="/add-recipe" className="text-base font-normal pr-2 flex items-center justify-end">Add Recipe <FaAngleRight /></Link>
                <h1>Recipes</h1>
                <Link to="/add-recipe" className="text-base font-normal pr-2 flex items-center justify-end">Add Recipe <FaAngleRight /></Link>
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