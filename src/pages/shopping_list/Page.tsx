import PageBody from "../../components/PageBody"
import PageHeaderShoppingList from "./PageHeaderShoppingList"
import ListShoppingList from "./ListShoppingList"


export default function Page(){

    return (
        <>
            <PageHeaderShoppingList />
            <PageBody>
                <ListShoppingList />
            </PageBody>
        </>
    )
}