import {twMerge} from "tailwind-merge"

export default function Card({children, className}) {
    const CardCss = twMerge(
        "bg-white shadow p-2 rounded",
        className
    )

    return (
        <div className={CardCss}>
            {children}
        </div>
    )
}