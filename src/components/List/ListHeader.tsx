type Props = {
    children: React.ReactNode
}

export default function ListHeader({children}: Props) : JSX.Element {
    
    return (
        <header className="flex items-center justify-between px-4 mb-1">
            {children}
        </header>
    )
}