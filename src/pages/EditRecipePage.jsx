import getCapString from "../utility/getCapedString"
import PageHeader from "../components/PageHeader"
import PageMain from "../components/PageMain"
import { Link, useParams } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { FaAngleRight, FaAngleLeft, FaPlus } from "react-icons/fa6"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import ConfirmModal from "../components/ConfirmModal"
import { useEffect, useState } from "react"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../firebase"

export default function EditRecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        const docRef = doc(db, "recipes", id)
        const unsub = onSnapshot(docRef, snapshot => {
            //sync up with local state
            const recipeObj = {
                ...snapshot.data(),
                id: id
            }

            setRecipe(recipeObj)
        })

        return unsub
    }, [])

    console.log(recipe)
    
    return (
        recipe ?
        <div>
            <PageHeader className="items-center">
                <Link 
                    className="flex items-center text-base pl-1 text-blue-600 font-normal"
                    to="./.."
                >
                    <span className="text-xl">
                        <FaAngleLeft />
                    </span>
                    Back
                </Link>
                <h1 className="col-start-2 col-span-4 justify-self-center">{getCapString("edit recipe")}</h1>
                <button
                    className="col-start-6 flex items-center justify-center text-xl"
                >
                    <FaPlus />
                </button>
            </PageHeader>
            <PageMain>
                <div>
                    <h2 className="ml-4 text-sm text-gray-500 mb-1">NAME RECIPE</h2>

                    <PageLink>
                        {getCapString(recipe.name)}
                        <FaAngleRight /> 
                    </PageLink>
                </div>
                <List>
                    {
                        recipe.ingredients.map((ingredient, index, arr) => {
                            let classNameGen = 
                                "flex items-center justify-between "
        
                            if (index !== arr.length - 1) {
                                classNameGen += " shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                            }
        
                            return (
                                <ListItem
                                    key={ingredient.id}
                                    className={classNameGen}
                                >
                                    <Link 
                                        className="flex justify-between items-center w-full"
                                        to={ingredient.id}
                                    >
                                        {getCapString(ingredient.name)}
                                        <FaAngleRight />
                                    </Link>
                                </ListItem>
                            )
        
                        })
                    }
                </List>

                {/* <Button 
                    className="flex items-center justify-between"
                    onClick={ToggleCheckAll}
                    
                >
                    {
                        recipe.ingredients.every(ingredient => ingredient.selected === true) ?
                            <>
                                Unselect all
                                <IoEllipseOutline className="text-xl"/>
                            </> :
                            <>
                                Select all
                                <IoCheckmarkCircle className="text-xl text-sky-700"/>
                            </> 
                    }
                </Button> */}

                <PageLink to="/recipes">
                    Recipes
                    <FaAngleRight />
                </PageLink>


            </PageMain>
            {/* {
                showConfirm &&
                <ConfirmModal 
                    question="Add ingredients to shopping list?" 
                    closeFunc={() => setShowConfirm(false)} 
                    confirmActionFunc={handleAddIngredientsToSL}
                />    
            }  */}
        </div> : null
    )
}