import { useLocation, Link } from "react-router-dom"
import { FaAngleLeft, FaCheck, FaPlus } from "react-icons/fa"
import PageHeader from "../components/PageHeader"
import getCapString from "../utility/getCapedString"

export default function EditRecipeNamePage() {
    const location = useLocation()
    const { name } = location.state

    
    return (
        <div>
            <PageHeader className="items-center">
                <Link 
                    className="flex items-center text-base pl-1 text-blue-600 font-normal"
                    to="./.."
                >
                    <span className="text-xl">
                        <FaAngleLeft />
                    </span>
                    Back
                </Link>
                <h1 className="col-start-2 col-span-4 justify-self-center">{getCapString("edit recipe name")}</h1>
            </PageHeader>
        </div>
    )
}