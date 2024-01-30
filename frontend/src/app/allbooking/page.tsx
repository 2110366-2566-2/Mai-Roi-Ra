import styles from "@/styles/FontPage.module.css"
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import getBookings from '@/libs/getBookings'
import BookingPanel from "@/components/BookingPanel"
import UpdateBookingForm from "@/components/admin/UpdateBooking"
import getUserProfile from "@/libs/getUserProfile"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default async function AllBooking() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.token) return null
    const bookings = await getBookings(session.user.token);
    const profile = session ? await getUserProfile(session.user.token) : null;

    return (
        <main className='w-[100%] flex flex-col items-center space-y-4 mt-[150px] w-screen'>
            <Suspense fallback={
                <div className="w-screen h-screen">
                    <p className={`${styles.allFont} relative text-[40px] font-bold 
            text-center mt-[130px] text-white dark:text-black`}>Loading...</p>
                    <LinearProgress />
                </div>
            }>
            <div className={`${styles.campgroundFont} dark:text-black uppercase text-white text-bold text-[40px] transition-transform transform hover:scale-[1.055] duration-300`}>
                All Booking History
            </div>
            <div className="w-screen">
            <div className={`${styles.campgroundFont} w-[100%] flex flex-wrap justify-center text-2xl font-bold`}>
                    {bookings.data.map((booking: Object, index: number) => (
                        <div key={booking._id} className={`w-[48%] ${index % 2 === 0 ? 'pl-0' : 'pl-4'}`}>
                            <BookingPanel
                                token={session.user ? session.user.token : null}
                                id={booking._id}
                                bookingDate={booking.bookingDate}
                                checkOutDate={booking.checkoutDate}
                                user={booking.user}
                                role={profile?.data.role}
                                all={true}
                            />
                        </div>
                    ))}
                </div>

                <div className="my-[50px] px-[90px]">
                    <UpdateBookingForm token={session.user.token} path={true}/>
                </div>
            </div>
            </Suspense>
        </main>
    )
}