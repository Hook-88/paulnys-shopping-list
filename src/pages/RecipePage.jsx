import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import PageMain from "../components/PageMain"
import { useParams, Link } from "react-router-dom"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";
import getCapString from "../utility/getCapedString"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import { FaAngleRight, FaPlus } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"

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

    function toggleSelected(ingredientId) {
        const newIngredientsArray = 
            recipe.ingredients.map(ingredient => {
                if (ingredient.id === ingredientId) {
                    
                    return {
                        ...ingredient,
                        selected: !ingredient.selected
                    }
                } else {

                    return ingredient
                }
            })
        
        setRecipe(prevRecipe => {
            
            return {
                ...prevRecipe,
                ingredients: newIngredientsArray
            }
        })

    }

    function selectAll(selectValue) {
        const newIngredientsArray = 
            recipe.ingredients.map(ingredient => {
                
                return {
                    ...ingredient,
                    selected: selectValue
                }
            })
        
        setRecipe(prevRecipe => {
        
            return {
                ...prevRecipe,
                ingredients: newIngredientsArray
            }
        })
    }

    function ToggleCheckAll() {
        const allChecked = recipe.ingredients.every(ingredient => ingredient.selected === true)
        selectAll(!allChecked)
    }

    return (
        recipe ?
        <div>
            <PageHeader className="items-center">
                <h1 className="col-start-2 col-span-4 justify-self-center">{getCapString(recipe.name)}</h1>
                <Link 
                    className="justify-self-end px-6 h-full flex items-center"
                    to="edit"
                >
                    <FaEdit />
                </Link>
            </PageHeader>
            <PageMain>
                <List>
                    {
                        recipe.ingredients.map((ingredient, index, arr) => {
                            let classNameGen = 
                                "flex items-center justify-between " + `${!ingredient.selected ? "text-white/40" : ""}`
        
                            if (index !== arr.length - 1) {
                                classNameGen += " shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                            }
        
                            return (
                                <ListItem
                                    key={ingredient.id}
                                    className={classNameGen}
                                    onClick={() => toggleSelected(ingredient.id)}
                                >
                                    {getCapString(ingredient.name)}
                                    {
                                        ingredient.selected ?
                                        <IoCheckmarkCircle className="text-xl text-sky-700"/> :
                                        <IoEllipseOutline className="text-xl"/>
                                    }
                                </ListItem>
                            )
        
                        })
                    }
                </List>

                <Button 
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
                </Button>
                
                <Button 
                    className="flex items-center justify-between disabled:text-white/40"
                    disabled={recipe.ingredients.every(ingredient => !ingredient.selected)}
                >
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