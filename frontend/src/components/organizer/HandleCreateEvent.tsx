'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import createEvent from "@/libs/createEvent"

export async function HandleCreateEvent(formData:FormData){

    try {
        const res = await createEvent(formData);
        console.log(res);
        console.log("Create Event successful");
    } catch (err) {
        console.log("Error during creating event: ", err)
    }
    revalidateTag(`events`);
    revalidatePath('/homepage');
    revalidatePath("/profile");
}



