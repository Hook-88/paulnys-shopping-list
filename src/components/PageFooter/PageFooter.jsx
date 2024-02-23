import css from "./PageFooter.module.css"

export default function PageFooter({children}) {
    
    return (
        <footer className={css.footer}>{children}</footer>
    )
}