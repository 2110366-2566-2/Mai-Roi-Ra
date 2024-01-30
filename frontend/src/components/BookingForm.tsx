'use client'
import styles from "@/styles/FontPage.module.css"
import Image from "next/image"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import BookingInstruction from "./BookingInstruction"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { AppDispatch } from "@/redux/store"
import dayjs, { Dayjs } from "dayjs"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { BookingAction } from "@/action/BookingAction"

export default function BookingForm({ token }: { token: string }) {
    const { data: session } = useSession();
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const urlParams = useSearchParams();
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    const dispatch = useDispatch<AppDispatch>();
    if (!name) return null;
    if (!id) return null;

    const handleAction = async () => {
        try {
            setError('');
            const currentDate = dayjs();
    
            const startDate = dayjs(checkInDate);
            const endDate = dayjs(checkOutDate);
    
            if (startDate.isBefore(currentDate) || endDate.isBefore(currentDate)) {
                setError("Dates cannot be in the past.");
                return;
            }
    
            const differenceInDays = endDate.diff(startDate, 'day');
    
            if (differenceInDays > 3) {
                setError("The booking duration can't be more than 3 days.");
                return;
            }
    
            const res = await BookingAction(
                id,
                startDate.format('YYYY/MM/DD'),
                endDate.format('YYYY/MM/DD'),
                token
            );
            setError('');
            console.log(res);
        } catch (err) {
            setError("Create Booking Failed. Please check the constraint.");
            console.log("Err: ", err);
        }
    };
    

    return (
        <div className={`${styles.campgroundFont} text-black relative w-screen h-screen`}>
            <div className="fixed inset-0 bg-cover bg-center z-0 saturate-100 opacity-80">
                <Image
                    src="/images/sky.jpg"
                    alt="Error to load wallpaper"
                    fill={true} />
            </div>
            <div className="relative flex justify-start items-center flex-row flex-wrap 
            w-screen h-screen space-x-[30px]">
                <div className="w-[100%] lg:w-[40%] ml-[10%]">
                    <BookingInstruction />
                </div>
                <div className="w-[600px] h-[80%] bg-white rounded-[10px] opacity-80 mt-[70px] 
                text-black bg-zinc-100">
                    <div className="text-black text-[30px] mt-[40px] text-center ">
                        Booking Your Campground
                    </div>
                    <form action={handleAction}>
                        <div className="relative opacity-100 ml-[40px] mt-[25px] mr-[40px]">
                            <div>
                                <label htmlFor="name" className="ml-[15px] block text-[12px] w-full opacity-60">
                                    Traveler Name
                                </label>
                                <input className="w-full mt-[5px] bg-white text-[15px] p-[10px] 
                                rounded-full indent-2 bg-white"
                                    type="text" id="name" placeholder="name" value={session ? session.user?.name : "Dont Sign In Yet"} readOnly />
                            </div>

                            <div className="mt-[20px]">
                                <label htmlFor="campgroundName" className="ml-[15px] block text-[12px] w-full opacity-60">
                                    Campground Name
                                </label>
                                <input className="w-full mt-[5px] bg-white text-[15px] p-[10px] 
                                rounded-full indent-2 bg-white"
                                    type="text" id="campgroundName" placeholder="Camp ground name" value={name} readOnly />
                            </div>
                            <div className="flex flex-row relative">
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-start flex-wrap mt-[20px]">
                                        <div>
                                            <label htmlFor="checkInDate" className="ml-[15px] block text-[12px] w-full opacity-60">
                                                Check In Date
                                            </label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id={checkInDate}
                                                    className="mt-[5px] bg-white"
                                                    value={checkInDate}
                                                    onChange={(e) => {
                                                        setCheckInDate(e);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>

                                    <div className="w-full mt-[20px]">
                                        <label htmlFor="checkOutDate" className="ml-[15px] block text-[12px] w-full opacity-60">
                                            Check Out Date
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                className="mt-[5px] bg-white"
                                                value={checkOutDate}
                                                onChange={(e) => {
                                                    setCheckOutDate(e);
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className="absolute right-[20px] top-[50%] transform -translate-y-1/2">
                                    <p className="font-black">CONSTRAINT !</p>
                                    <p> • Difference between <br/> <span className="font-bold text-rose-500">check in date</span> and <br/> <span className="font-bold text-rose-500">check out</span> date <br/> can't be more than <span className="text-red-500 font-bold">3 days</span> <br/> • Dates can't be in the past </p>
                                </div>
                            </div>
                            <div className="pt-[40px] space-x-[20px] mt-[5px] flex flex-col items-center">
                                <button
                                    type="submit"
                                    className="opacity-100 rounded-full w-full text-[20px] bg-[#ffa900] text-white ring-slate-600 p-[5px] py-[10px] duration-300 hover:bg-indigo-800"
                                >
                                    Booking Campground
                                </button>
                                {error && (
                                    <div className="bg-red-500 text-white text-lg py-1 px-3 rounded mt-10">
                                        {error}
                                    </div>
                                )}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}