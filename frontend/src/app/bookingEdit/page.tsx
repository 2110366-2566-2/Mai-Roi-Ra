"use client"
import UpdateBooking from "@/components/admin/UpdateBooking";
import getBooking from "@/libs/getBooking";
import { useSearchParams } from "next/navigation";

export default async function BookingEdit(){
    const urlParams = useSearchParams();
    const id = urlParams.get('id');
    const token = urlParams.get('token');
    const booking = await getBooking(id? id : "",token? token : "");

    return (
        <div>
            <UpdateBooking/>
        </div>
    )
}