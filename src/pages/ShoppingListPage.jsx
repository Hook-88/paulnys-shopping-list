import { Link } from "react-router-dom"

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
            <header>Shopping List</header>
            <main>
                <ul>
                    {
                        shoppingListDummy.map(item => <li key={item.id}>{item.name}</li>)
                    }
                </ul>
                <button>Check All</button>
                <br />
                <Link>Recipes</Link>
                <br />
                <button>Delete checked items</button>

            </main>
        </div>
    )
}