'use server'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import createProblem from "@/libs/createProblem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export async function HandleCreateProblem(problem:string, description:string){
    const session = await getServerSession(authOptions);
    const user = session?.user;

    try {
        const res = await createProblem(user?.user_id,problem,description);
        console.log(res);
        console.log("Create Problem successful");
    } catch (err) {
        console.log("Error during creating problem: ", err)
    }
    revalidateTag(`problems`);
    redirect(`/supportandservice`);
}



