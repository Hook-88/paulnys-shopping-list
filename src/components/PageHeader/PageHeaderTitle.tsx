type Props = {
    children: string 
}

export default function PageHeaderTitle({children} : Props) {
    
    return (
        <h1 className="col-start-2 col-span-4 text-center">
            {children}
        </h1>
    )
}