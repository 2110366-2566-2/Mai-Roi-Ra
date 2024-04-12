'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import updateEvent from "@/libs/updateEvent"

export async function HandleUpdateEvent(id:string,name:string,activity:string, startDate:string, endDate:string, price:number, location:string, district:string, 
    province:string, description:string,status:string, token:string){
        
    try {
        const res = await updateEvent(id,name,activity,location,district,province,price,description,
            startDate,endDate,status,token);
        console.log(res)
        console.log("Update Event successful")
    } catch (err) {
        console.log("Error during update event: ", err)
    }
    revalidateTag(`events`);
    revalidateTag('event');
    revalidatePath(`/homepage`);
    revalidatePath('/profile');
    revalidatePath(`/event/${id}`);
}



