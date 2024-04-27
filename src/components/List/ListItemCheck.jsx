import { useContext } from "react"
import getCapString from "../../utility/getCapString"
import { FaCheck, FaRegCircle } from "react-icons/fa6"
import { ListContext } from "./List"


export default function ListItemCheck({children, itemObj, onClick}) {
    const {itemsArray} = useContext(ListContext)
    
    return (
                    <li
                        className="flex items-center pl-3"
                        onClick={onClick}
                    >   
                        <div
                            className={`
                                flex-grow py-2 flex justify-between items-center
                                ${itemObj.id === itemsArray[itemsArray.length - 1].id ? 
                                    "" : "shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"} 
                                
                            `}
                        >
                            {children}
                            {
                                itemObj.checked &&
                                <button className="mr-3">
                                    <FaCheck />
                                </button>
                            }
                        </div>      
                    </li>

    )
}