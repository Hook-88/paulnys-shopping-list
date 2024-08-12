import PageHeader from "../../components/PageHeader/PageHeader"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { useContext } from "react"
import { ShoppingListContext } from "./PageShoppingList"
import { ShoppingListContextType } from "./PageShoppingList"

export default function PageHeaderShoppingList() {
    const { dispatch } = useContext<ShoppingListContextType>(ShoppingListContext)

    function handleClickDelete() {
        if (dispatch) {
            dispatch({
                type: "delete_selection"
            })
        }
    }
    
    return (
        <PageHeader>
            <PageHeader.Title>
                Shopping List
            </PageHeader.Title>
            <Menu>
                <Menu.Button>
                    <FaEllipsis />
                </Menu.Button>
                <Menu.Dropdown>
                    <Menu.Item itemType="button">
                        Add new item
                    </Menu.Item>
                    <Menu.Item 
                        itemType="button"
                        onClick={handleClickDelete}
                    >
                        Delete selection
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </PageHeader>
    )
}