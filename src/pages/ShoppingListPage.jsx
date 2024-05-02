import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight, FaCheck } from "react-icons/fa6"
import PageHeader from "../components/PageHeader"
import getCapString from "../utility/getCapedString"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import ListItemLast from "../components/List/ListItemLast"
import Button from "../components/Button"
import NavLink from "../components/NavLink"
import PageMain from "../components/PageMain"
import Form from "../components/Form"
import { useEffect, useState } from "react"
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { nanoid } from "nanoid"

export default function ShoppingListPage() {
    const [shoppingList, setShoppipngList] = useState(null)
    const [showAddItem, setShowAddItem] = useState(false)
    const [formData, setFormData] = useState("")

    function toggleShowAddITem() {
        setShowAddItem(prev => !prev)
    }

    function handleFormChange(event) {
        setFormData(event.target.value)
    }

    async function addItem() {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const slDoc = await getDoc(docRef)
        const itemObj = {
            name: formData.toLowerCase(),
            checked: false,
            id: nanoid()
        }
        const newSlArray = [...slDoc.data().items, itemObj]

        await updateDoc(docRef, {items: newSlArray})

        setFormData("")

    }


    useEffect(() => {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const unSub = onSnapshot(docRef, snapshot => {
            //sync with local state
            setShoppipngList(snapshot.data())
        })

        return unSub
    }, [])

    async function toggleChecked(itemId) {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const slDoc = await getDoc(docRef)
        const newSlArray = slDoc.data().items.map(item => {
            if (item.id === itemId) {
                
                return {
                    ...item,
                    checked: !item.checked
                }
            } else {

                return item
            }
        })

        await updateDoc(docRef, {items: newSlArray})
    }

    async function checkAllItems(checkValue) {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const slDoc = await getDoc(docRef)
        const newSlArray = slDoc.data().items.map(item => {
            return {
                ...item,
                checked: checkValue
            }
        })

        await updateDoc(docRef, {items: newSlArray})
    }

    function toggleCheckAllItems() {
        shoppingList?.items.some(item => item.checked === false) ?
            checkAllItems(true) :
            checkAllItems(false)
    }

    async function deleteItem(itemId) {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const slDoc = await getDoc(docRef)
        const newSlArray = slDoc.data().items.filter(item => item.id !== itemId)

        await updateDoc(docRef, {items: newSlArray})
    }

    async function deleteCheckedItems() {
        const docRef = doc(db, "shoppingList", "MMy6fOXSXocRw3w7k7GR")
        const slDoc = await getDoc(docRef)
        const newSlArray = slDoc.data().items.filter(item => item.checked === false)

        await updateDoc(docRef, {items: newSlArray})
    }
    
    return (
        <div>
            <PageHeader>
                <h1 className="col-start-2 col-span-4 justify-self-center">Shopping List</h1>
                {
                    shoppingList?.items.length !== 0 &&
                    <button 
                        className="col-start-6 flex items-center justify-center text-xl"
                        onClick={toggleShowAddITem}
                    >
                        {showAddItem ? <FaCheck /> : <FaPlus />}
                    </button>
                }
            </PageHeader>
            {
                shoppingList ?
                <PageMain>
                    {
                        showAddItem &&
                        <Form 
                            className="grid"
                            onSubmit={addItem}
                        >
                            <input 
                                type="text" 
                                name=""
                                className="bg-white/5 rounded-lg py-2 px-4 text-center font-bold"
                                autoFocus
                                placeholder="Item..."
                                onChange={handleFormChange}
                                value={formData}
                                required 
                            />
                        </Form>
                    }

                {
                    shoppingList?.items.length === 0 && !showAddItem &&
                    <Button
                        className="text-3xl py-4 flex justify-center"
                        onClick={toggleShowAddITem}
                    >
                        <FaPlus />
                    </Button>
                }

                <List>
                    {
                        shoppingList.items.map((item, index, arr) => {

                            if (index === arr.length - 1) {
                                
                                return (
                                    <ListItemLast
                                        key={item.id}
                                        className={item.checked ? "flex items-center justify-between text-white/20 line-through italic": ""}
                                        onClick={() => toggleChecked(item.id)}
                                    >
                                        {getCapString(item.name)}
                                        {item.checked ? <FaCheck /> : null}
                                    </ListItemLast>
                                )
                            } else {

                                return (
                                    <ListItem
                                        key={item.id}
                                        className={item.checked ? "flex items-center justify-between text-white/20 line-through italic": ""}
                                        onClick={() => toggleChecked(item.id)}
                                    >
                                        {getCapString(item.name)}
                                        {item.checked ? <FaCheck /> : null}
                                    </ListItem>
                                )

                            }
                        })
                    }
                </List>
                <Button 
                    className="flex items-center justify-between"
                    onClick={toggleCheckAllItems}
                >
                    {
                        shoppingList?.items.some(item => item.checked === false) ?
                            <>
                            Check All <FaCheck /> 
                            </>:
                            "Uncheck All"
                    }
                </Button>

                <NavLink>Recipes <FaAngleRight /></NavLink>

                <Button 
                    className="text-red-700 disabled:text-red-700/40"
                    onClick={deleteCheckedItems}
                    disabled={shoppingList?.items.every(item => item.checked === false)}
                >
                    Delete checked items

                </Button>

            </PageMain> : "Loading..."
            }
        </div>
    )
}

// className="py-1 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"