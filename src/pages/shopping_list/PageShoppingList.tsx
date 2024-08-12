import { FaEllipsis, FaEyeSlash } from "react-icons/fa6"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageBody from "../../components/PageBody"
import { shoppingList } from "../../data.ts"
import List from "../../components/List/List.tsx"
import Menu from "../../components/Menu/Menu.tsx"
import CardItemDefault from "./CardItemDefault.tsx"
import CardItemSelected from "./CardItemSelected.tsx"
import { useReducer } from "react"

export default function PageShoppingList(){
    const [localShoppingList, dispatch] = useReducer(reducer, shoppingList)

    function reducer(localShoppingList, action) {
        switch (action.type) {
            case "toggle_select" : {
                return (
                    localShoppingList.map(
                        item => item.id === action.id ? 
                            {...item, selected: !item.selected} 
                            : item
                    )
                )
                break
            }

            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function handleClickItem(itemId) {
        dispatch({
            type: "toggle_select",
            id: itemId
        })
    }

    return (
        <>
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
                        <Menu.Item itemType="button">
                            Delete selection
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </PageHeader>
            <PageBody>
                <List>
                    <List.Header>
                        <List.Progress />
                        <button className="flex items-center gap-1 text-xs">
                            Hide selected <FaEyeSlash />
                        </button>
                    </List.Header>
                    <List.Body>
                        {
                            localShoppingList.map(item => {

                                return (
                                    <li 
                                        key={item.id}
                                        className="border rounded border-transparent"
                                        onClick={() => handleClickItem(item.id)}
                                    >
                                        {
                                            item.selected ? (
                                                <CardItemSelected item={item} />
                                            ) : <CardItemDefault item={item} />
                                        }
                                    </li>
                                )
                            })
                        }
                    </List.Body>
                </List>
                
            </PageBody>
        </>
    )
}