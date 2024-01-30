"use server"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import deleteBooking from "@/libs/deleteBooking"


export async function DeleteBookingAction(bid: string, token: string, path: boolean){
    try {
        const res = await deleteBooking(bid, token)
        console.log(res)
        console.log("Delete Campground successful")
    } catch (err) {
         console.log("Error during creating booking: ", err)
    }
    revalidateTag(`bookings`)
    if (path) {
        redirect(`/allbooking`)
    } else {
        redirect(`/mybooking`)
    }
}



