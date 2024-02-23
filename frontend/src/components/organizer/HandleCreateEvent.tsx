'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import createEvent from "@/libs/createEvent"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function HandleCreateEvent(name:string,activity:string, startdate:string, endDate:string, price:number, location:string, district:string, 
    province:string, description:string, imageSrc:string){
    const session = await getServerSession(authOptions);
    const user = session?.user;

    try {
        const res = await createEvent(user?.organizer_id,name,activity,location,district,province,price,description,imageSrc,startdate,endDate,user.token);
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



