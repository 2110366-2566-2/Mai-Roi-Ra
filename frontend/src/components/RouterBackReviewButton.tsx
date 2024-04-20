'use client'
import { useRouter } from "next/navigation"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function RouterBackEventButton(){
    const router = useRouter();

    return (
        <div className="w-full h-[7%] pl-[3%] pt-[30px] pb-[10px]" onClick={()=>{() => router.back();}}>
            <ArrowBackIosNewIcon className="text-[#1DA1F2] hover:scale-105 cursor-pointer"/>
        </div>
    )
}