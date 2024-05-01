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
import Form from "../components/Form"
import { nanoid } from "nanoid"
import ConfirmModal from "../components/ConfirmModal"

export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useState(null)
    const [addItems, setAddItems] = useState(false)
    const [formData, setFormData] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)

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

    function toggleAddItems() {
        setAddItems(prevAddItems => !prevAddItems)
    }

    async function checkAllItems(checkValue) {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const newItemsArray = shoppingList.items.map(item => ({...item, checked: checkValue}))

        await updateDoc(docRef, {items : newItemsArray})
    }

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

    useEffect(() => {
        if(shoppingList?.items.length === 0) {
            setAddItems(true)
        }

    }, [shoppingList])

    function handleClickToCheck() {
        shoppingList.items.every(item => item.checked) ?
            checkAllItems(false) :
            checkAllItems(true)
    }

    async function deleteChecked() {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const newItemsArray = shoppingList.items.filter(item => item.checked === false)

        setShowConfirm(false)
        await updateDoc(docRef, {items : newItemsArray})
    }

    async function addItem() {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const itemObj = {
            name: formData.toLowerCase().trim(),
            checked: false,
            id: nanoid()
        }
        const newItemsArray = [...shoppingList.items, itemObj]

        await updateDoc(docRef, {items: newItemsArray})
        setFormData("")
    }

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    return (
        <div>
            <Header>
                <Link 
                    to="/recipes" 
                    className="flex items-center" 
                >
                    <FaAngleLeft  />
                    Recipes
                </Link>
                <h1
                    className="col-start-2 col-span-2 justify-self-center font-bold"
                >
                    {getCapString("koop lijst")}
                </h1>
                <button onClick={toggleAddItems} className="flex items-center text-xl justify-self-end">
                    {addItems ? <FaCheck /> : <FaPlus />}
                </button>
            </Header>
            <Main>
                {
                    shoppingList ?
                    <>
                    {
                        shoppingList.items.length > 0 &&

                        <List itemsArray={shoppingList.items}>
                        {
                            shoppingList?.items.map(item => (
                                <li
                                    key={item.id}
                                    className="flex items-center px-3"
                                    onClick={() => toggleCheckItem(item.id)}
                                >   
                                    <div
                                        className={`
                                            flex-grow py-2 flex justify-between items-center
                                            ${item.id === shoppingList.items[shoppingList.items.length - 1].id ? 
                                                "" : "shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"} 
                                            ${item.checked ? "text-gray-500 line-through italic" : ""}
                                        `}
                                    >
                                        { getCapString(item.name) }
                                        { item.checked && <FaCheck /> }
                                    </div>      
                                </li>
                                )  
                            )
                        }
                    </List>
                    }

                    {
                        addItems &&
                        <Form onSubmit={addItem}>
                            <input 
                                type="text"
                                placeholder="Ingredient"
                                className="bg-white bg-opacity-15 py-2 rounded-lg w-full text-xl text-center"
                                autoFocus
                                onChange={handleFormChange}
                                value={formData ? getCapString(formData) : ""} 
                            />
                        </Form>
                    }
                    {
                        !addItems ?
                        <>
                        <Button
                            className="justify-between"
                            onClick={handleClickToCheck}
                            >
                            {shoppingList.items.every(item => item.checked) ? "Uncheck all" : "Check all"}
                            {!shoppingList.items.every(item => item.checked) ? <FaCheck /> : null}
                        </Button> 
                        
                        <Button
                            className="text-red-500 justify-center disabled:text-red-500/30"
                            onClick={() => setShowConfirm(true)}
                            disabled={!shoppingList.items.some(item => item.checked)}
                        >
                            Delete checked items
                        </Button>

                        </> : null
                    }
                    </>: "Loading...."
                }
            </Main>
            {
                showConfirm && 
                <ConfirmModal 
                    question="Do you want to delete the checked items?"
                    closeModalFunc={() => setShowConfirm(false)}
                    confirmActionFunc={deleteChecked}
                />
            }
        </div>
    )
}