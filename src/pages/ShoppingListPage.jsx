import { Link } from "react-router-dom"
import { FaPlus, FaAngleRight } from "react-icons/fa6"
import PageHeader from "../components/PageHeader"

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
                <ul className="bg-white/5 rounded-lg pl-4">
                    {
                        shoppingListDummy.map((item, index, arr) => {
                            let liCSS = "py-2"

                            liCSS += index === arr.length - 1 ? 
                                "" : 
                                " shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"

                            return (
                                <li
                                    key={item.id}
                                    className={liCSS}
                                >
                                    {item.name}
                                </li>
                            )
                        })
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

// className="py-1 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"