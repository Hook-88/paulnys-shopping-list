import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import RecipesPage from './pages/RecipesPage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import EditRecipePage from './pages/EditRecipePage.jsx'
import EditRecipeNamePage from './pages/EditRecipeNamePage.jsx'
import EditIngredientPage from './pages/EditIngredientPage.jsx'
import AddRecipePage from "./pages/AddRecipePage.jsx"
import ShoppingListPage from './pages/ShoppingListPage.jsx'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<ShoppingListPage />} />
                    <Route path="add-recipe" element={<AddRecipePage />} />
                    <Route path="recipes" element={<RecipesPage />} />
                    <Route path="recipes/:id" element={<RecipePage />} />
                    <Route path="recipes/:id/edit" element={<EditRecipePage />} />
                    <Route path="recipes/:id/edit/name" element={<EditRecipeNamePage />} />
                    <Route path="recipes/:id/edit/:ingredientId" element={<EditIngredientPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
