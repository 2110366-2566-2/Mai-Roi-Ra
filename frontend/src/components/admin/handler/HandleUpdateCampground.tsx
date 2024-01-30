'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import updateCampground from "@/libs/updateCampground"


export async function HandleUpdateCampground(cid: string, name: string, address: string, district: string, province: string, postalCode: string, tel: string, picture: string, token: string){
    console.log(token)
    try {
        const res = await updateCampground(cid, name, address, district, province, postalCode, tel, picture, token)
        console.log(res)
        console.log("Update Campground successful")
    } catch (err) {
        alert("Not match constraint Ja")
         console.log("Error during creating booking: ", err)
    }
    revalidateTag(`campground/${cid}`)
    revalidatePath(`/information/${cid}`)
    revalidateTag(`campgrounds`)
    redirect(`/information/${cid}`)
}



