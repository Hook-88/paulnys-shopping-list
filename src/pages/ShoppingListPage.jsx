import { Link, useParams } from "react-router-dom"
import { FaPlus, FaAngleRight, FaRegSquare, FaCircle, FaCheck, FaRegCircle, FaAngleLeft } from "react-icons/fa6"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import Card from "../components/Card"
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import getCapString from "../utility/getCapString"
import List from "../components/List/Index"
import Header from "../components/Header"
import Main from "../components/Main"
import Button from "../components/Button"

export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useState(null)

    async function toggleCheckItem(itemId) { 
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const newItemsArray = shoppingList.items.map(item => {
            
            if (item.id === itemId) {
                
                return {
                    ...item,
                    checked: !item.checked
                }
            } else {

                return item
            }
        })
        
        await updateDoc(docRef, {items : newItemsArray})
    }

    // async function checkAllItems(checkValue) {
    //     const docRef = doc(db, "recipes", id)
    //     const newIngredientsArray = recipe.ingredients.map(ingredient => ({...ingredient, checked: checkValue}))

    //     await updateDoc(docRef, {ingredients : newIngredientsArray})
    // }

    useEffect(() => {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const unsub = onSnapshot(docRef, snapshot => {
            const shoppingListObj = {
                ...snapshot.data(),
                id: snapshot.id
            }

            setShoppingList(shoppingListObj)
        })

        return unsub 
    }, [])

    // function handleClickToCheck() {
    //     recipe.ingredients.every(ingredient => ingredient.checked) ?
    //         checkAllItems(false) :
    //         checkAllItems(true)
    // }

    return (
        <div>
            <Header>
                <Link 
                    to="/recipes" 
                    className="flex items-center" 
                    // onClick={() => checkAllItems(false)}
                >
                    <FaAngleLeft  />
                    Recipes
                </Link>
                <h1
                    className="col-start-2 col-span-2 justify-self-center font-bold"
                >
                    {getCapString("koop lijst")}
                </h1>
                <Link to="edit" className="flex items-center justify-self-end">
                    <FaRegEdit />
                </Link>
            </Header>
            <Main>
                {
                    shoppingList ?
                    <>
                    <List itemsArray={shoppingList.items}>
                        {
                            shoppingList.items.map(item => (
                                <List.ItemCheck key={item.id} itemObj={item} onClick={() => toggleCheckItem(item.id)}>
                                        {getCapString(item.name)}
                                    </List.ItemCheck>
                                ) 
                            )
                        }
                    </List>

                    <Button
                        className="justify-between"
                        // onClick={handleClickToCheck}
                    >
                        {shoppingList.items.every(item => item.checked) ? "Uncheck all" : "Check all"}
                        {!shoppingList.items.every(item => item.checked) ? <FaCheck /> : null}
                    </Button>

                    </>: "Loading...."
                }
                {
                    shoppingList?.items.some(item => item.checked) &&
                    <Button>Add to Shopping List</Button>
                }
            </Main>
        </div>
    )
}