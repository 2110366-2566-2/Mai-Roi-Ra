'use server'
import createUserSearchHistory from "@/libs/createUserSearchHistory";
import { revalidatePath, revalidateTag } from "next/cache"

export async function HandleCreateUserSearchHistory(user_id:string,search:string,token:string){
    console.log(token)
    try {
        const res = await createUserSearchHistory(user_id,search,token);
        console.log(user_id,search);
        console.log(res);
        console.log("Create Searching History successful");
    } catch (err) {
        console.log("Error during creating search history : ", err)
    }
    revalidateTag(`searchhistory`);
    revalidatePath(`/homepage?search=${search}`);
    revalidatePath(`/homepage`);
}



