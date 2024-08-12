import List from "../../components/List/List"
import { useContext, useState, useEffect } from "react"
import { ShoppingListContext } from "./PageShoppingList"
import CardItemDefault from "./CardItemDefault"
import CardItemSelected from "./CardItemSelected"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function ListShoppingList() {
    const { dispatch, localShoppingList } = useContext(ShoppingListContext)
    const [listBodyContent, setListBodyContent] = useState<React.ReactElement>()
    const [filter, setFilter] = useState<boolean>(false)
    const localShoppingListSelectedLength = 
        localShoppingList.filter(item => item.selected === true).length
    
    useEffect(() => {
        if (filter) {
            setListFiltered()

            return
        }
        setListDefault()
        
    }, [localShoppingList, filter])

    useEffect(() => {
        if (localShoppingListSelectedLength === 0) {
            setFilter(false)
        }

    }, [localShoppingListSelectedLength])
        
    function handleClickItem(itemId: string) {
        if (dispatch) {
            dispatch({
                type: "toggle_select",
                id: itemId
            })
        }
    }

    function toggleFilter() {
        setFilter(prevFilter => !prevFilter)
    }

    function setListDefault() {
        
        setListBodyContent(
            <>
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
            </>
        )
    }

    function setListFiltered() {
        setListBodyContent(
            <>
                {
                    localShoppingList
                        .filter(item => item.selected === false)
                        .map(item => {

                            return (
                                <li 
                                    key={item.id}
                                    className="border rounded border-transparent"
                                    onClick={() => handleClickItem(item.id)}
                                > 
                                    <CardItemDefault item={item} />
                                </li>
                            )
                        })
                }
            </>
        )
    }
    return (
        <List>
            <List.Header>
                <List.Progress
                    selectedLength={localShoppingListSelectedLength}
                    totalLength={localShoppingList.length}
                    completedText="completed" 
                />
                <button
                    disabled={localShoppingListSelectedLength === 0}
                    onClick={toggleFilter} 
                    className="
                        flex items-center gap-1 text-xs
                        disabled:text-white/30
                    "
                >
                    {
                        filter && localShoppingListSelectedLength > 0 ? 
                            <>
                                Show checked <FaEye />
                            </> : 
                            <>
                                Hide checked <FaEyeSlash />
                            </>
                    }
                </button>
            </List.Header>
            <List.Body>
                {listBodyContent}
            </List.Body>
        </List>
    )
}