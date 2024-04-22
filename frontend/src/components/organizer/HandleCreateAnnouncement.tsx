'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import createAnnouncement from "@/libs/createAnnouncement";
import { getServerSession } from "next-auth";

export async function HandleCreateAnnouncement(id: string, name: string, subject: string, content: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null

    try {
<<<<<<< HEAD
        const res = await createAnnouncement(id,name,subject,content,user? user.token : "");
=======
        const res = await createAnnouncement(id, name, subject, content, session.user.token);
>>>>>>> develop
        console.log(res)
        console.log("Create Announcement successful")
    } catch (err) {
        console.log("Error during creating announcement: ", err)
    }
}



