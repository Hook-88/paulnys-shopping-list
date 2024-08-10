import PageHeaderTitle from "./PageHeaderTitle"

type Props = {
    children: string | React.JSX.Element | React.JSX.Element[] 
}

export default function PageHeader({children} : Props) {

    return (
        <header className="bg-white/5 text-lg grid grid-cols-6 px-4 py-2 font-semibold tracking-wider">
            {children}
        </header>
    )
    
}

PageHeader.Title = PageHeaderTitle