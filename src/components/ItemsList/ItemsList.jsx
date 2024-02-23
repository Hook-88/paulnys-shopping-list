import Card from "../Card/Card"
import css from "./ItemsList.module.css"


export default function ItemsList({children}) {

    return (
        <Card>
            <ul className={css.list}>
                {children}
            </ul>
        </Card>
    )
    
}