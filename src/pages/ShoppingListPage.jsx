import PageHeader from "../components/PageHeader/PageHeader"
import MainContent from "../components/MainContent/MainContent"
import PageFooter from "../components/PageFooter/PageFooter"
import AddNewItem from "../components/AddNewItem/AddNewItem"

import Card from "../components/Card/Card"
import Form from "../components/Form/Form"

export default function ShoppingListPage() {

    return (
        <>
            <PageHeader>
                <h1>Here goes header</h1>
            </PageHeader>
            <MainContent>
                <AddNewItem />
            </MainContent>
            <PageFooter>
                <small>Copyright sheit</small>
            </PageFooter>

        </>
    
    )
    
}