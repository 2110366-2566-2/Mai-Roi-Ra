'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import updateEvent from "@/libs/updateEvent"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function HandleUpdateEvent(id:string,name:string,activity:string, startDate:string, endDate:string, price:number, location:string, district:string, 
    province:string, description:string, imageSrc:File){
    const session = await getServerSession(authOptions);
        
    try {
        const res = await updateEvent(id,name,activity,location,district,province,price,description,
            imageSrc,startDate,endDate,session?.user.token);
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
    redirect(`/profile`);
}



