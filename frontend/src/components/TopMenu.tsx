import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import TopMenuPanel from "./TopMenuPanel";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.token) return null;
  const profile = session ? await getUserProfile(session.user.token) : null;

  return (
   <div>
    <TopMenuPanel role={profile?.data.role} sessionUser={session}/>
   </div>
  );
}
