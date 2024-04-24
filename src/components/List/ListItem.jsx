import { useContext } from "react"
import getCapString from "../../utility/getCapString"
import { FaCheck } from "react-icons/fa6"
import { ListContext } from "./List"


export default function ListItem({children, itemObj}) {
    const {itemsArray} = useContext(ListContext)
    
    return (
                    <li
                        className="flex items-center pl-3"
                    >
                        <div
                            className={`
                                flex-grow py-2 flex justify-between items-center
                                ${itemObj.id === itemsArray[itemsArray.length - 1].id ? 
                                    "" : "shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"} 
                            `}
                        >
                            {children}
                        </div>      
                    </li>

    )
}