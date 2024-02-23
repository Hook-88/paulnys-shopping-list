import css from "./MainContext.module.css"

export default function MainContext({children}) {

    return (
        <main className={css.main}>
            {children}
        </main>
    )
    
}