'use client'
import Image from "next/image"
import styles from "@/styles/FontPage.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props{
    role:string
    id:string
    picture:string
    name:string
    address:string
    province:string
    district:string
    postalCode:string
    tel:string
}

export default function CardItem({role,id,picture,name,address,province,district,postalCode,tel}:Props){
    const router = useRouter();

    function onCardAction(event:React.SyntheticEvent){
        if (event.type == "mouseover"){
            event.currentTarget.classList.remove("mt-[10px]");
            event.currentTarget.classList.add("mt-[20px]");
            event.currentTarget.classList.add("shadow-2xl");
            event.currentTarget.classList.add("shadow-white");
        } else {
            event.currentTarget.classList.remove("mt-[20px]");
            event.currentTarget.classList.add("mt-[10px]");
            event.currentTarget.classList.remove("shadow-2xl");
            event.currentTarget.classList.remove("shadow-white");
        }
    }
    
    return (
            <div className={`${styles.campgroundFont} grid grid-cols-1 gap-5 w-[400px] rounded-[10px] my-[50px]`}>
                <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow 
                hover:shadow-xl hover:shadow-black/30"
                onClick={(e) => {
                    e.preventDefault(); 
                    if (role == "admin") {
                        router.push(`/information/${id}`)
                    }}}>
                    
                    <div className="h-96 w-72">
                        <Image className="rounded-[20px] h-full w-full object-cover transition-transform duration-500" 
                        src={picture} 
                        alt=""
                        fill={true}/>
                    </div>

                    <div className="rounded-[20px] absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black 
                    group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center 
                        justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="font-dmserif text-3xl font-bold text-white">{name}</h1>
                            <div className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 
                            group-hover:opacity-100 flex flex-row flex-wrap justify-center mt-[20px]">
                                <Image className="w-[50px] h-[50px]"
                                src="/images/location.png"
                                alt="Location"
                                width={100}
                                height={100}/>
                                <div className="w-[80%] ml-[-30px] mt-[10px]">
                                    <p>{`${address}, ${district}, ${province}, ${postalCode} dqwwwwwwwwwwqwqqdfq`}</p>
                                </div>
                            </div>
                            <div className="text-lg italic text-white opacity-0 transition-opacity duration-300 
                            group-hover:opacity-100 flex flex-row flex-wrap justify-start mt-[5px]">
                                <Image className="w-[50px] h-[50px]"
                                src="/images/telephone.png"
                                alt="Location"
                                width={100}
                                height={100}/>
                                <div className="w-[50%] mt-[10px]">
                                    <p>{`${tel}`}</p>
                                </div>
                            </div>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize 
                                text-white shadow shadow-black/60 duration-300 mt-[10px]" 
                                onMouseOver={(e)=>onCardAction(e)}
                                onMouseOut={(e)=>onCardAction(e)}

                                onClick={(e)=>{e.stopPropagation(); router.push(`/booking?id=${id}&name=${name}`)}}>
                                Booking
                            </button>
                        </div>
                </div>
            </div>
    )
}