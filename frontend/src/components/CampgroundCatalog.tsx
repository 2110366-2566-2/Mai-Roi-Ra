import { getServerSession } from "next-auth";
import CardItem from "./CardItem";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";

export default async function CampgroundCatalog({ campJson }: { campJson: Object }) {

    const campJsonReady = await campJson;
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null
    const profile = session ? await getUserProfile(session.user.token) : null;

    return (
        <div>
            <div className="dark:bg-slate-100 flex flex-row flex-wrap justify-center gap-4 dark:rounded-3xl">
                {campJsonReady.data.map((campItem: Object) => (
                    <div key={campItem.id} className="w-[100%] md:w-[50%] lg:w-[30%]">
                        <CardItem  role={profile?.data.role} id={campItem.id} picture={campItem.picture} name={campItem.name} 
                        address={campItem.address} province={campItem.province} district={campItem.district} 
                        postalCode={campItem.postalcode} tel={campItem.tel}/>
                    </div>
                ))}
            </div>
        </div>
    )
}