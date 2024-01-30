'use client'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { UpdateBookingAction } from "@/action/UpdateBookingAction";
import styles from "@/styles/FontPage.module.css"
import stylesDate from "@/styles/stylesDate.module.css"

export default function UpdateBookingForm({ token,path }: { token: string,path:boolean }) {
    const [id, setId] = useState("");
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
    const [error, setError] = useState<string>('')

    const handleUpdateBooking = async () => {
        try {
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

            await UpdateBookingAction(
                id,
                startDate.format('YYYY/MM/DD'),
                endDate.format('YYYY/MM/DD'),
                token,
                path
            );
            setError('');
            console.log("Update booking successful");
        } catch (err) {
            setError('Update error. Server Failed ?');
            console.log("Err: ", err);
        }
    };

    return (
        <div className={`${styles.campgroundFont}  h-[70%] rounded-[10px] opacity-60 
        text-black bg-black border-white border-[1px] dark:border-black dark:bg-white dark:border-[1px] 
        w-full pt-[30px] hover:opacity-100 transition-opacity duration-300 relative`}>
            <div className="text-white dark:text-black text-[2vw] text-center font-semibold ">
                Update Booking Form
            </div>
            <form action={handleUpdateBooking} className="px-[20px] w-full text-white dark:text-black relative opacity-100 mt-[25px] mr-[40px]">
                <div className="relative opacity-100 ml-[15px] mt-[25px] mr-[40px]">
                    <div className="flex items-center w-full my-2">
                            <div className="w-full">
                                <label htmlFor="id" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                    Insert the booking_id that you want to edit
                                </label>
                                <input type="text" required id="id" name="id" placeholder="Insert Your Booking Id"
                                className="bg-black text-white dark:bg-white dark:text-black border-2 border-gray-200 rounded w-full p-2
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                    </div>

                <div className="w-full flex flex-row justify-start mt-[20px]">
                        <div className="w-[50%]">
                            <label htmlFor="checkInDate" className="ml-[15px] block text-[1.25vw] w-full opacity-60 ">
                                New Check In Date
                            </label>
                            <div className="ml-[30px] border-2 border-gray-200">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="w-[100%] mt-[7px] bg-[#6B6B6B] dark:bg-white text-white"  value={checkInDate}
                                    onChange={(e) => { setCheckInDate(e) }} />
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="w-[50%]">
                            <label htmlFor="checkInDate" className="ml-[15px] block text-[1.25vw] w-full opacity-60 dark:text-slate-100">
                                New Check Out Date
                            </label>
                        <div className="ml-[30px] border-gray-200 border-2 text-gray-700">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker className="w-[100%] mt-[7px] bg-[#6B6B6B] dark:bg-white" value={checkOutDate}
                                onChange={(e) => { setCheckOutDate(e) }} />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                    <div className="py-[40px] space-x-[20px] flex flex-col items-center">
                        <button
                            type="submit"
                            className="opacity-100 rounded-full w-full text-[20px] bg-[#ffa900] text-white ring-slate-600 p-[5px] py-[10px] 
                            duration-300 hover:bg-indigo-800">
                            Update booking
                        </button>
                        {error && (
                        <div className="bg-red-500 text-white w-fit text-[20px] py-1 px-3 rounded mt-5">
                            {error}
                        </div>
                    )}
                    </div>
                    
                </div>
            </form>
        </div>
    )
}