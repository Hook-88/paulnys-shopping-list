import { Link } from "react-router-dom"
import Menu from "./Menu/Index"

export default function NavMenu() {

    return (
        <Menu>
            <Menu.Button>Menu</Menu.Button>
            <Menu.Dropdown>
                <Menu.Item><Link to="recipes">Recipes</Link></Menu.Item>
                <Menu.Item><Link to="add-recipe">Add recipe</Link></Menu.Item>
                <Menu.Item><Link to="/">Shopping list</Link></Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}