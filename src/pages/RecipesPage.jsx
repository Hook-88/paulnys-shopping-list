import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight, FaCheck, FaAngleLeft, FaCartShopping } from "react-icons/fa6"
import Button from "../components/Button"
import PageLink from "../components/PageLink"
import PageMain from "../components/PageMain"
import { createContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import ShoppingListPageHeader from "./ShoppingListPageHeader"
import addItemToFirebase from "../utility/addItemToFirebase"
import AddItemInput from "../components/AddItemInput"
import ShoppingListEl from "../components/ShoppingListEl"
import setAllPropsInFirebase from "../utility/setAllPropsInFirebase"
import deleteValuesInFirebase from "../utility/deleteValuesInFirebase"
import ConfirmModal from "../components/ConfirmModal"
import PageHeader from "../components/PageHeader"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import getCapString from "../utility/getCapedString"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)
    const [showAddItem, setShowAddItem] = useState(false)

    useEffect(() => {
        const unsub = onSnapshot(recipesCollection, snapshot => {
            const newRecipeArray = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setRecipes(newRecipeArray)
        })

        return unsub
    }, [])
    
    return (
            <div>
                <PageHeader>
                    <h1 className="col-start-2 col-span-4 justify-self-center">Recipes</h1>
                    <Link
                        to="add-recipe"  
                        className="col-start-6 flex items-center justify-center text-xl"
                    >
                        <FaPlus />
                    </Link>
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
                {
                    recipes ?
                        <PageMain>
                            {
                                recipes.length > 0 &&
                                <List>
                                    {
                                        recipes.map((item, index, arr) => {
                                            let classNameGen;

                                            if (index !== arr.length - 1) {
                                                classNameGen += " shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                                            }

                                            if (item.checked) {
                                                classNameGen += " flex items-center justify-between text-white/20 line-through italic"
                                            }

                                            return (
                                                <ListItem
                                                    key={item.id}
                                                    className={classNameGen}
                                                >
                                                    <Link className="flex justify-between items-center">
                                                        {getCapString(item.name)}
                                                        <FaAngleRight />
                                                    </Link>
                                                </ListItem>
                                            )

                                        })
                                    }
                                </List>

                            }

                            <PageLink to="/">
                                <span className="flex items-center gap-2">
                                    <FaCartShopping /> Shopping List 
                                </span>
                                <FaAngleRight />
                            </PageLink>

                        </PageMain> :
                        <PageMain>
                            Loading...
                        </PageMain>
                }
            </div>
    )
}