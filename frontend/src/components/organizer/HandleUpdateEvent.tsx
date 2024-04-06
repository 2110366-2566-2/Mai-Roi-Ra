'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import updateEvent from "@/libs/updateEvent"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
 

export async function HandleUpdateEvent(id:string,formData:FormData){
    const session = await getServerSession(authOptions);
        
    try {
        const res = await updateEvent(id,formData,session?.user.token);
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



