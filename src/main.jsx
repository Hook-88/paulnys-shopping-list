import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<h1>Here goes shopping list page</h1>}/>
                    <Route path="recipes" element={<h1>Here goes Recipes page</h1>}/>
                    <Route path="add-recipe" element={<h1>Here goes Add Recipe page</h1>}/>
                    <Route path="recipes/:id" element={<h1>Here goes Recipe page</h1>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
