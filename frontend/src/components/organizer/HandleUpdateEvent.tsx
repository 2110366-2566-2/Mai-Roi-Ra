'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import UpdateEvent from "@/libs/updateEvent"


export async function HandleUpdateEvent(id:string,name:string,activity:string, dateRange:string, price:number, location:string, district:string, 
    province:string, description:string, imageSrc:string){

    try {
        const res = await UpdateEvent(id,"550e8400-e29b-41d4-a716-446655440200",name,activity,location,district,province,price,description,
            imageSrc,dateRange.substring(0,10),dateRange.substring(11))
        console.log(res)
        console.log("Update Event successful")
    } catch (err) {
        console.log("Error during update event: ", err)
    }
    revalidateTag(`events`);
    revalidateTag('event');
    revalidatePath(`/homepage/user`);
    revalidatePath('/homepage/organizer');
    revalidatePath(`/homepage/event/${id}`);
    redirect(`/homepage/organizer`);
}



