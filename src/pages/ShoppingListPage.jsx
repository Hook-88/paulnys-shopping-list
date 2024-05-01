import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6"

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
            <header>
                <h1>Shopping List</h1>
                <button>
                    <FaPlus />
                </button>
            </header>
            <main>
                <ul>
                    {
                        shoppingListDummy.map(item => <li key={item.id}>{item.name}</li>)
                    }
                </ul>
                <button>Check All</button>
                <br />
                <button>Delete checked items</button>
                <br />
                <Link>Recipes <FaAngleRight /></Link>

            </main>
        </div>
    )
}