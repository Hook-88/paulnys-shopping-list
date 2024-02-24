import classNames from "classnames"
import PageHeaderCss from "./PageHeader.module.css"

export default function PageHeader({children, className, ...rest}) {
    const headerClassName = classNames(
        PageHeaderCss.header,
        className 
    )

    return (
        <header className={headerClassName} {...rest}>{children}</header>
    )
}