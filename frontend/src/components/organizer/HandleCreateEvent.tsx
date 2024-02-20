'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import createEvent from "@/libs/createEvent"


export async function HandleCreateEvent(name:string,activity:string, startdate:string, endDate:string, price:number, location:string, district:string, 
    province:string, description:string, imageSrc:string){

    try {
        const res = await createEvent("550e8400-e29b-41d4-a716-446655440200",name,activity,location,district,province,price,description,imageSrc,startdate,endDate);
        console.log(res)
        console.log("Create Event successful")
    } catch (err) {
        console.log("Error during creating event: ", err)
    }
    revalidateTag(`events`);
    revalidatePath('/homepage');
    revalidatePath("/profile");
    redirect(`/profile`);
}



