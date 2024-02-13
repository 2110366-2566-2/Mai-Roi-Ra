'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import deleteEvent from "@/libs/deleteEvent"


export async function HandleDeleteEvent(id: string){
    try {
        const res = await deleteEvent(id);
        console.log(res)
        console.log("Delete Event successful")
    } catch (err) {
        alert("Not match constraint Ja")
         console.log("Error during creating booking: ", err)
    }
    
    revalidateTag(`events`);
    revalidatePath('/homepage/user');
    revalidatePath("/homepage/organizer");
    redirect(`/homepage/organizer`);
}



