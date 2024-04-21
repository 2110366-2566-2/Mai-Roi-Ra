'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import deleteEvent from "@/libs/deleteEvent"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";


export async function HandleDeleteEvent(id: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null
    try {
        const res = await deleteEvent(id, session.user.token);
        console.log(res)
        console.log("Delete Event successful")
    } catch (err) {
        alert("Not match constraint Ja")
        console.log("Error during creating booking: ", err)
    }

    revalidateTag(`events`);
    revalidatePath('/homepage');
    revalidatePath("/profile");
    redirect(`/profile`);
}



