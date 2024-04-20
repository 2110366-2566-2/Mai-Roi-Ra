import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import getGoogleLoginInfo from "@/libs/getGoogleLogin"
import { useRouter } from 'next/router';

export async function HandleLoginGoogle(){
    const router = useRouter();
    const { code } = router.query;

    if (!code) {
        throw new Error('Code parameter missing from URL');
    }

    try {
        console.log("HELHLEHLELHELLELH")
        const res = await getGoogleLoginInfo(code)
        console.log(res)
        console.log("Get Google Info successfully")
    } catch (err) {
        console.log("Error during creating booking: ", err)
    }
    revalidatePath(`/homepage`)
    redirect(`/homepage`)
}



