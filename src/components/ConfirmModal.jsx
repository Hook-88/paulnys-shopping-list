import List from "./List/List"
import { FaCheck } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"

export default function ConfirmModal({question, closeFunc = () => {}, confirmActionFunc = () => {}}) {

    function handleConfirm() {
        confirmActionFunc()
        closeFunc()
    }
    
    return (
        <div
            className="fixed inset-0 bg-white/20 backdrop-blur flex items-center justify-center"
        >
            <List className="bg-[#0d0d0d] p-0 text-center">
                <li
                    className="py-2 px-4 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                >
                    {question}
                </li>
                <li className="grid">
                    <button 
                        className="flex items-center justify-center gap-2 py-2 mx-4 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]"
                        onClick={handleConfirm}
                    >
                        Yes <FaCheck className="text-green-700"/>
                    </button>

                </li>
                <li className="grid">
                    <button 
                        className="flex items-center justify-center gap-2 py-2 px-4"
                        onClick={closeFunc}
                    >
                        No <IoClose className="text-xl text-red-700" />
                    </button>

                </li>
            </List>
        </div>
    )
}