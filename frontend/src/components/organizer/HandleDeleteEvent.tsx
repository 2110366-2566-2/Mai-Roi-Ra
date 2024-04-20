'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import deleteEvent from "@/libs/deleteEvent"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function HandleDeleteEvent(id: string){
    const session = await getServerSession(authOptions);

    try {
        const res = await deleteEvent(id,session? session.user.token : "");
        console.log(res)
        console.log("Delete Event successful")
    } catch (err) {
        console.log("Error during delete event: ", err)
    }
    
    revalidateTag(`events`);
    revalidatePath('/homepage');
    revalidatePath("/profile");
    redirect(`/profile`);
}



