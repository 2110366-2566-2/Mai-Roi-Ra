import Link from "next/link";

interface Props{
    title:string
    pageRef:string
}

export default function TopMenuItem({title,pageRef} : Props) {
    return (
        <Link href={pageRef} 
        className='ml-[50px] transition-transform transform hover:scale-[1.155] 
        duration-300'>
            {title}
        </Link>
    )
}