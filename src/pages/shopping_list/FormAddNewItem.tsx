import { useForm } from "react-hook-form"
import Button from "../../components/Button"
import { useContext } from "react"
import { PageShoppingListContext } from "./Page"

type FormData = {
    itemName: string
}

export default function FormAddNewItem() {
    const {closeDialog} = useContext(PageShoppingListContext)
    const {register, reset, handleSubmit} = useForm({
        defaultValues: {
            itemName: ""
        }
    })

    function onHandleSubmit(formData: FormData) {
        console.log(formData)
        reset()
    }
    
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="flex gap-2 mb-2">
                <input 
                    type="text" 
                    placeholder="item..."
                    autoFocus
                    required
                    className="
                        bg-white/10 rounded px-2
                        flex-grow
                    "
                    {...register("itemName")}
                />
                <Button 
                    className="bg-red-900"
                    type="button"
                    onClick={closeDialog}
                >
                    X
                </Button>
            </div>
            <Button
                className="w-full bg-green-900"
            >
                Add to shopping list
            </Button>
        </form>
    )
}