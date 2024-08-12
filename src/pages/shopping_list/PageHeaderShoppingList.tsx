import PageHeader from "../../components/PageHeader/PageHeader"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { useContext } from "react"
import { ShoppingListContext } from "./PageShoppingList"
import { ShoppingListContextType } from "./PageShoppingList"
import { PageShoppingListContext } from "./Page"

export default function PageHeaderShoppingList() {
    const { dispatch } = useContext<ShoppingListContextType>(ShoppingListContext)
    const { openDialog, setDialogContent } = useContext(PageShoppingListContext)

    function handleClickDelete() {
        if (dispatch) {
            dispatch({
                type: "delete_selection"
            })
        }
    }

    function handleClickAddItem() {
        setDialogContent(
            <>
                <p>Time to add stuff</p>
            </>
        )
        openDialog()
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
                    <Menu.Item 
                        itemType="button"
                        onClick={handleClickAddItem}
                    >
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