import { Link } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"
import Menu from "./Menu/Index"

export default function NavMenu() {

    return (
        <Menu>
            <Menu.Button className="text-xl p-3 z-10 relative">
                <FaBars />
            </Menu.Button>
            <Menu.Dropdown
                className="bg-sky-700 text-white text-xl fixed inset-x-0 top-0 text-center flex flex-col gap-2 py-2 pb-3"
            >
                <Menu.Item><Link to="recipes">Recipes</Link></Menu.Item>
                <Menu.Item><Link to="add-recipe">Add recipe</Link></Menu.Item>
                <Menu.Item><Link to="/">Shopping list</Link></Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}