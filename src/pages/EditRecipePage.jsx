import getCapString from "../utility/getCapedString"
import PageHeader from "../components/PageHeader"
import PageMain from "../components/PageMain"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { FaAngleRight, FaAngleLeft, FaPlus, FaCheck } from "react-icons/fa6"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import ConfirmModal from "../components/ConfirmModal"
import { useEffect, useState } from "react"
import { onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"
import addItemToFirebase from "../utility/addItemToFirebase"
import AddItemInput from "../components/AddItemInput"

export default function EditRecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showAddItem, setShowAddItem] = useState(false)
    const navigate = useNavigate()

    const AddIngredientObj = {
        collectionName : "recipes", 
        docId : id, 
        docProp: "ingredients"
    }

    function addIngredient(value) {
        addItemToFirebase(AddIngredientObj, value)
    }

    function toggleShowAddItem() {
        setShowAddItem(prev => !prev)
    }

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

    async function deleteRecipe(recipeId) {
        navigate("/recipes")
        const docRef = doc(db, "recipes", recipeId)
        await deleteDoc(docRef)

    }

    
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
                    onClick={toggleShowAddItem}
                >
                    {
                        showAddItem ? <FaCheck /> : <FaPlus />
                    }
                </button>
            </PageHeader>
            <PageMain>
                <div>
                    <h2 className="ml-4 text-sm text-gray-500 mb-1">NAME RECIPE</h2>

                    <PageLink to="name">
                        {getCapString(recipe.name)}
                        <FaAngleRight /> 
                    </PageLink>
                </div>

                {   recipe.ingredients.length > 0 &&
                    <div>
                        <h2 className="ml-4 text-sm text-gray-500 mb-1">INGREDIENTS</h2>
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
                                                to={`ingredients/${ingredient.id}`}
                                            >
                                                {getCapString(ingredient.name)}
                                                <FaAngleRight />
                                            </Link>
                                        </ListItem>
                                    )
                
                                })
                            }
                        </List>
                    </div>
                }

                {
                    showAddItem &&
                    <AddItemInput addItemFunction={addIngredient} />
                }

                <Button 
                    className="text-red-700 mt-4"
                    onClick={() => setShowConfirm(true)}
                    // disabled={shoppingList?.items.every(item => item.checked === false)}
                >
                    Delete Recipe
                </Button>



            </PageMain>
            {
                showConfirm &&
                <ConfirmModal 
                    question="Are you sure you want to delete the recipe?" 
                    closeFunc={() => setShowConfirm(false)} 
                    confirmActionFunc={() => deleteRecipe(id)}
                />    
            } 
        </div> : null
    )
}