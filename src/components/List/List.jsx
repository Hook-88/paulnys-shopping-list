import { createContext } from "react"
import getCapString from "../../utility/getCapString"

const ListContext = createContext()

export default function List({children, itemsArray}) {

    
    return (
        <ListContext.Provider value={{itemsArray}}>
            <ul className="cursor-pointer bg-white bg-opacity-15 rounded-lg">
                {children}
            </ul>
        </ListContext.Provider>
    )
}

export { ListContext }