'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect, useSearchParams } from "next/navigation"
import createBooking from "@/libs/createBooking"


export async function BookingAction(cid: string, bookingDate: string, checkoutDate: string, token: string){
    console.log(token)
    try {
        console.log(cid, bookingDate, checkoutDate)
        const res = await createBooking(cid, bookingDate, checkoutDate, token)
        console.log(res)
        console.log("Create Booking successful")
    } catch (err) {
         console.log("Error during creating booking: ", err)
    }
    revalidateTag("bookings")
    revalidatePath("/mybooking")
    revalidatePath("/history")
    redirect("/mybooking")
}



