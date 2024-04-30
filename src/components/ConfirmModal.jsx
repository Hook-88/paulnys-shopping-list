import { useContext, useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"

export default function ConfirmModal({closeModalFunc = () => {}, confirmActionFunc = () => {}, question = "add question prop"}) {
    
    return (
        <section className="flex fixed bg-white/30 backdrop-blur inset-0 items-center justify-center z-30">
                <ul className="cursor-pointer bg-[#262626] rounded-lg mx-4">
                    <li
                        className="flex items-center cursor-default"
                    >
                        <div
                            className={`
                                flex-grow py-2 flex justify-center items-center
                                shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]
                                px-3 text-center
                            `}
                        >
                            {question}
                        </div>      
                    </li>

                    <li
                        className="flex items-center px-3"
                    >
                        <button
                            className={`
                                flex-grow py-2 flex justify-center items-center
                                 shadow-[rgba(100,100,100,0.5)_0px_1px_0px_0px]
                                 gap-2
                            `}
                            onClick={confirmActionFunc}
                        >
                            Yes <FaCheck className="text-green-500"/>
                        </button>      
                    </li>

                    <li
                        className="flex items-center px-3"
                    >
                        <button
                            className={`
                                flex-grow py-2 flex justify-center items-center gap-2
                            `}
                            onClick={closeModalFunc}

                        >
                            No
                            <span className="text-xl text-red-500">
                                <IoClose />
                            </span> 
                        </button>      
                    </li>
                </ul>
            </section>
    )
} 