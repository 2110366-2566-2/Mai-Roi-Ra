'use server'
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import updateBooking from "@/libs/updateBooking"


export async function UpdateBookingAction(id: string, bookingDate: string, checkoutDate: string, token: string,path: boolean){
    console.log(token)
    try {
        console.log(id, bookingDate, checkoutDate)
        const res = await updateBooking(id, bookingDate, checkoutDate, token);
        console.log(res)
        console.log("Update Booking successful")
    } catch (err) {
         console.log("Error during creating booking: ", err)
    }
    revalidateTag(`bookings/${id}`)
    revalidateTag(`bookings`)
    if (path){
        redirect("/allbooking")
    } else {
        redirect("/mybooking")
    }
}



