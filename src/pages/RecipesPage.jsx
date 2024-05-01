import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import Card from "../components/Card"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import List from "../components/List/Index"
import getCapString from "../utility/getCapString"
import Header from "../components/Header"
import Main from "../components/Main"
import LinkButton from "../components/LinkButton"

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
            <Header className="grid-cols-6">
                <Link to="/" className="text-sm font-normal flex items-center justify-end col-span-2 justify-self-start"> <FaAngleLeft className="text-base"/>Shopping List</Link>
                <h1 className="col-start-3 text-lg col-span-2 justify-self-center font-bold">Recipes</h1>
            </Header>
            <Main>
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
                <LinkButton className="justify-center text-xl py-4" to="/add-recipe">
                    <FaPlus />
                </LinkButton>
            </Main>
        </div>
    )
}