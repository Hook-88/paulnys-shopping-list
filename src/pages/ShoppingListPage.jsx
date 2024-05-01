import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6"
import PageHeader from "../components/PageHeader"
import getCapString from "../utility/getCapedString"
import List from "../components/List/List"
import ListItem from "../components/List/ListItem"
import ListItemLast from "../components/List/ListItemLast"

const shoppingListDummy = [
    {
        id: "bhkce5677",
        name: "beer",
        checked: false
    },
    {
        id: "bhbhj3e5677",
        name: "rice",
        checked: false
    },
    {
        id: "bhnbjkcdw7e5677",
        name: "coca cola",
        checked: false
    }
]

export default function ShoppingListPage() {
    
    return (
        <div>
            <PageHeader>
                <h1 className="col-start-2 col-span-4 justify-self-center">Shopping List</h1>
                <button className="col-start-6 flex items-center justify-center text-xl">
                    <FaPlus />
                </button>
            </PageHeader>
            <main className="px-4">
                <List>
                    {
                        shoppingListDummy.map((item, index, arr) => {

                            if (index === arr.length - 1) {
                                
                                return (
                                    <ListItemLast
                                        key={item.id}
                                    >
                                        {getCapString(item.name)}
                                    </ListItemLast>
                                )
                            } else {

                                return (
                                    <ListItem
                                        key={item.id}
                                    >
                                        {getCapString(item.name)}
                                    </ListItem>
                                )

                            }
                        })
                    }
                </List>
                <button>Check All</button>
                <br />
                <button>Delete checked items</button>
                <br />
                <Link>Recipes <FaAngleRight /></Link>

            </main>
        </div>
    )
}

// className="py-1 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"