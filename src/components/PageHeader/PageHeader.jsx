import PageHeaderCss from "./PageHeader.module.css"

export default function PageHeader({children}) {

    return (
        <header className={PageHeaderCss.header}>{children}</header>
    )
}