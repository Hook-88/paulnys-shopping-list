import { Link, Outlet } from "react-router-dom"
import NavMenu from "./components/NavMenu"
import Menu from "./components/Menu/Index"

export default function App() {
    return (
        <>         
            {/* <NavMenu /> */}
            <Outlet />
        </>
    )
}