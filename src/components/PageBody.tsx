type Props = {
    children: string| JSX.Element | JSX.Element[]
}

export default function PageBody({children}: Props) {
    
    return (
        <main className="px-4 mt-4">
            {children}
        </main>
    )
}