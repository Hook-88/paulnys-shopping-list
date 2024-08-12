import PageBody from "../../components/PageBody"
import PageHeaderShoppingList from "./PageHeaderShoppingList"
import ListShoppingList from "./ListShoppingList"
import { useRef, createContext, useState } from "react"
import Card from "../../components/Card"

const PageShoppingListContext = createContext({
})

export default function Page(){
    const [dialogContent, setDialogContent] = useState(null)
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
                    {dialogContent}
                </Card>

                </div>
            </dialog>
        </PageShoppingListContext.Provider>
    )
}

export { PageShoppingListContext }