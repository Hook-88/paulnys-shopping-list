import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import PageMain from "../components/PageMain"
import { useParams } from "react-router-dom"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";
import getCapString from "../utility/getCapedString"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import { FaAngleRight, FaPlus } from "react-icons/fa6"

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

    async function getRecipe() {
        const docRef = doc(db, "recipes", id)
        const docSnap = await getDoc(docRef)

        setRecipe(docSnap.data())
    }

    useEffect(() => {
        getRecipe()
    }, [])

    return (
        recipe ?
        <div>
            <PageHeader>
                <h1 className="col-start-2 col-span-4 justify-self-center">{getCapString(recipe.name)}</h1>
                {/* {
                    showAddItem || shoppingList?.items.length > 0 ?
                    <button 
                        className="col-start-6 flex items-center justify-center text-xl"
                        onClick={toggleShowAddITem}
                    >
                        {showAddItem ? <FaCheck /> : <FaPlus />}
                    </button> : null
                } */}
            </PageHeader>
            <PageMain>
                <List>
                    {
                        recipe.ingredients.map((ingredient, index, arr) => {
                            let classNameGen = "flex items-center justify-between" 
        
                            if (index !== arr.length - 1) {
                                classNameGen += " shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                            }
        
                            // if (ingredient.checked) {
                            //     classNameGen += " flex items-center justify-between text-white/20 line-through italic"
                            // }
        
                            return (
                                <ListItem
                                    key={ingredient.id}
                                    className={classNameGen}
                                    // onClick={() => togglePropInFirebase(AddItemObj, item.id, "checked")}
                                >
                                    {getCapString(ingredient.name)}
                                    {
                                        ingredient.checked ?
                                        <IoCheckmarkCircle className="text-xl text-sky-700"/> :
                                        <IoEllipseOutline className="text-xl"/>
                                    }
                                    {ingredient.checked ? <FaCheck /> : null}
                                </ListItem>
                            )
        
                        })
                    }
                </List>

                <Button className="flex items-center justify-between">
                    Select all
                    <IoCheckmarkCircle className="text-xl text-sky-700"/>
                </Button>
                
                <Button className="flex items-center justify-between">
                    Add to shopping list
                    <FaPlus />
                </Button>
                
                <PageLink to="/recipes">
                    Recipes
                    <FaAngleRight />
                </PageLink>


            </PageMain> 
        </div> : null
    )
}