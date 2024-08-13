import PageBody from "../../components/PageBody"
import PageHeaderShoppingList from "./PageHeaderShoppingList"
import ListShoppingList from "./ListShoppingList"
import React, { useRef, createContext, useState } from "react"
import Card from "../../components/Card"

type PageShoppingListContextType = {
    openDialog? : () => void
    closeDialog?: () => void
    setDialogContent?: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
}

const PageShoppingListContext = createContext<PageShoppingListContextType>({
})

export default function Page(){
    const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    function openDialog() {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    function closeDialog() {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    return (
        <PageShoppingListContext.Provider value={{
            openDialog,
            closeDialog,
            setDialogContent
        }}>
            <PageHeaderShoppingList />
            <PageBody>
                <ListShoppingList />
            </PageBody>
            <dialog 
                ref={dialogRef}
            >
                <div 
                    className="
                        bg-black/10 backdrop-blur fixed inset-0 
                        flex flex-col justify-end px-4 pb-8
                    "
                >    

                <Card className="text-center text-white px-2 bg-[#1a1a1a] mt-4">
                    {dialogContent || null}
                </Card>

                </div>
            </dialog>
        </PageShoppingListContext.Provider>
    )
}

export { PageShoppingListContext }