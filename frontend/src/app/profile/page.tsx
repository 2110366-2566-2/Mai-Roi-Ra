import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import styles from "@/styles/FontPage.module.css"

export default async function Profile() {
    revalidatePath('/profile')
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.token) return null
    const profile = session ? await getUserProfile(session.user.token) : null;
    var createdAt = new Date(profile.data.createdAt)

    return (
        <Suspense fallback={
            <div className="w-screen h-screen">
                <p className={`${styles.allFont} relative text-[40px] font-bold 
        text-center mt-[130px] text-white dark:text-black`}>Loading...</p>
                <LinearProgress />
            </div>
        }>
            <div className="bg-black dark:bg-white flex flex-row items-center justify-center h-screen text-white dark:text-black">
                <div className="border-white dark:border-black border-2 p-[10px] pt-[15px] pr-[0px] mt-[20px]">
                    <div className="">
                        <div className="ml-[40px] w-[320px] h-[300px]">
                            <Image
                                src="/images/signin.jpg"
                                alt="Profile Image"
                                width={1000}
                                height={1000}
                                className="border-4 border-white rounded-full w-full"
                            />
                        </div>
                    </div>
                    <div className="w-[90%] max-w-xl dark:text-slate-900 dark:bg-white p-6 rounded-lg mt-6 md:ml-6 dark:border-blue-700">
                        {/* <h1 className="text-3xl md:text-4xl font-bold mb-4">User Profile</h1> */}
                        <div className="text-lg space-y-4">
                            <div className="text-[50px] font-bold">{profile.data.name}</div>
                            <div>________________________________________</div>
                            <div><span className="font-bold pr-3">Email: </span> {profile.data.email}</div>
                            <div><span className="font-bold pr-10">Tel: </span> {profile.data.tel}</div>
                            <div><span className="font-bold">Member Since: </span> {createdAt.toDateString()}</div>
                        </div>
                    </div>

                </div>

            </div>
        </Suspense>
    )
}