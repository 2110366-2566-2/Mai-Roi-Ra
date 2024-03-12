'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import createAnnouncement from "@/libs/createAnnouncement";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function HandleCreateAnnouncement(id:string,name:string,subject:string,content:string){
    const session = await getServerSession(authOptions);
    const user = session?.user;

    try {
        const res = await createAnnouncement(id,name,subject,content,user.token);
        console.log(res)
        console.log("Create Announcement successful")
    } catch (err) {
        console.log("Error during creating announcement: ", err)
    }
}



