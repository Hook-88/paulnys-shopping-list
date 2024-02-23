import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import ShoppingListPage from './pages/ShoppingListPage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<ShoppingListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
