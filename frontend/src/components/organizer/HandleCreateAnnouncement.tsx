'use server'
import createAnnouncement from "@/libs/createAnnouncement";
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function HandleCreateAnnouncement(id:string,name:string,subject:string,content:string){

    try {
        const res = await createAnnouncement(id,name,subject,content);
        console.log(res)
        console.log("Create Announcement successful")
    } catch (err) {
        console.log("Error during creating announcement: ", err)
    }
    revalidatePath(`events/${id}`);
}



