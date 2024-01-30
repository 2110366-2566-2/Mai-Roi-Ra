'use client'
import getBooking from "@/libs/getBooking"
import styles from "@/styles/FontPage.module.css"
import dayjs from "dayjs"
import { Date } from "mongoose"
import { DeleteBookingAction } from "@/action/DeleteBookingAction"

interface Props {
    id: string
    token: string
    cpName: string
    bookingDate: Date
    checkOutDate: Date
    user: string
    role: string
    all: boolean
}

export default function BookingItem({ id, token, cpName, bookingDate, checkOutDate, user, role, all }: Props) {

    const handleDeleteBooking = async () => {
        try {
            await DeleteBookingAction(id, token, all)
            console.log('Delete Booking successful')
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <form action={handleDeleteBooking}>
            <div className={`${styles.campgroundFont} bg-gray-900 dark:bg-white rounded-xl w-[100%] pl-5 py-4 text-white dark:text-black mt-[30px]`} >
                <div className="ml-5 space-y-4">
                    <div className='flex font-bold text-[20px]'>Booking Id:
                        <span className='font-normal pl-5'>{id}</span></div>
                    <div className='flex font-bold text-[20px]'>Campground Name :
                        <span className='font-normal pl-5'>{cpName}</span></div>
                    {all && role == "admin" ?
                        <div className='flex font-bold text-[20px]'>User Id:
                            <span className='font-normal pl-5'>{user}</span></div>
                        : null
                    }
                    <div className='flex font-bold text-[20px]'>Booking Date :
                        <span className='font-normal pl-5'>{dayjs(bookingDate).format('YYYY/MM/DD')}</span></div>
                    <div className='flex font-bold text-[20px]'>Check Out Date:
                        <span className='font-normal pl-5'>{dayjs(checkOutDate).format('YYYY/MM/DD')}</span></div>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <button type="submit"
                        className='bg-red-500 text-white border-2 border-red-800 border-opacity-100
                            font-semibold py-2 px-6 rounded-lg z-3
                            transform transition-colors duration-300 hover:bg-rose-800  hover:border-black
                            p-3 mt-2'>
                        Cancel Booking
                    </button>
                </div>
            </div>
        </form>
    )
}