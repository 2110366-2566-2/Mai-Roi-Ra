'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import createEvent from "@/libs/createEvent"


export async function HandleCreateEvent(name:string, dateRange:string, price:number, location:string, district:string, province:string, 
    description:string, imageSrc:string){

    try {
        const res = await createEvent("550e8400-e29b-41d4-a716-446655440200",name,location,price,description,imageSrc,"31-31-411","314-51","113111")
        console.log(res)
        console.log("Create Event successful")
    } catch (err) {
        console.log("Error during creating event: ", err)
    }
    revalidateTag(`events`);
    revalidatePath(`/homepage/user`);
    revalidatePath('/homepage/organizer');
    redirect(`/homepage/user`);
}



