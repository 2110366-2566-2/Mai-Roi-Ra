"use client"
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function RouterBackEventButton({ isEventDetailPage }: { isEventDetailPage: boolean }) {
    const router = useRouter();

    return (
        <div className="absolute top-[38px] left-8 flex items-center justify-center hover:scale-[1.2] duration-300" 
            onClick={() => { isEventDetailPage ? router.push('/homepage') : router.back() }}>
            <ArrowBackIosNewIcon className="text-[#1DA1F2]" />
        </div>
    );
}
