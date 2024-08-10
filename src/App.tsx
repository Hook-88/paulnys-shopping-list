import { BrowserRouter, Routes, Route } from "react-router-dom"
import PageShoppingList from "./pages/shopping_list/PageShoppingList"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageShoppingList />} />
            </Routes>
        </BrowserRouter>
    )
}