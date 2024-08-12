import { FaEye, FaEyeSlash } from "react-icons/fa6"
import PageBody from "../../components/PageBody"
import List from "../../components/List/List"
import CardItemDefault from "./CardItemDefault"
import CardItemSelected from "./CardItemSelected"
import React, { useContext, useEffect, useState } from "react"
import PageHeaderShoppingList from "./PageHeaderShoppingList"
import { ShoppingListContext } from "./PageShoppingList"


export default function Page(){
    const { dispatch, localShoppingList } = useContext(ShoppingListContext)
    const [listBodyContent, setListBodyContent] = useState<React.ReactElement>()
    const [filter, setFilter] = useState<boolean>(false)
    
    const localShoppingListSelectedLength = 
        localShoppingList.filter(item => item.selected === true).length
    
        
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

    useEffect(() => {
        if (filter) {
            setListBodyContent(
                <List.Body>
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
                </List.Body>
            )

            return
        }

        setListBodyContent(
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
        )
    }, [localShoppingList, filter])

    useEffect(() => {
        if (localShoppingListSelectedLength === 0) {
            setFilter(false)
        }

    }, [localShoppingListSelectedLength])

    return (
        <>
            <PageHeaderShoppingList />
            <PageBody>
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
                    {listBodyContent}
                </List>
                
            </PageBody>
        </>
    )
}