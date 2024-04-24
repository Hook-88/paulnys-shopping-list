import { FaCheck } from "react-icons/fa6"


export default function ListItemNameRecipe({children}) {
    
    return (
                    <li
                        className="flex items-center pl-3"
                    >
                        <div
                            className={`
                                flex-grow py-2 flex justify-between items-center 
                            `}
                        >
                            {children}
                        </div>      
                    </li>

    )
}