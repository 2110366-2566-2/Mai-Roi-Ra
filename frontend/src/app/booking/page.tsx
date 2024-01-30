import BookingForm from "@/components/BookingForm"
import { getSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function Booking(){
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.token) return;
    return (
        <div className="w-screen h-screen items-center center 
        flex justify-center">
            <BookingForm token={session.user.token}/>
        </div>
    )
}
