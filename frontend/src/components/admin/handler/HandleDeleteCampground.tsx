'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import deleteCampground from "@/libs/deleteCampground"


export async function HandleDeleteCampground(cid: string, token: string){
    try {
        const res = await deleteCampground(cid, token)
        console.log(res)
        console.log("Delete Campground successful")
    } catch (err) {
        alert("Not match constraint Ja")
         console.log("Error during creating booking: ", err)
    }
    revalidateTag(`campgrounds`)
    revalidatePath('/information')
    redirect(`/information`)
}



