import Image from "next/image";
import EventItem from "@/components/EventItem";
import getEvents from "@/libs/getEvents";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHomepage from "@/components/AdminHomepage";
import UserHomepage from "@/components/UserHomepage";
import AdminSupportAndService from "@/components/AdminSupportAndService";
import UserSupportAndService from "@/components/UserSupportAndService";
import getProblems from "@/libs/getProblems";

export default async function Homepage() {
  const session = await getServerSession(authOptions);
  // const events = await getEvents();
  console.log("successfully loaded Support and Service Page");
  // console.log(events);


  if (!session || !session.user || !session.user.token) return null;
  const problems = session ? await getProblems(session.user.user_id) : null;

  let datas;
  datas = problems.problem_lists;


  return (
    <main className="bg-white text-black h-full">
      {session?.user.role == "ADMIN" ? (
        <AdminSupportAndService></AdminSupportAndService>
      ) : (
        <UserSupportAndService datas={datas} >
        </UserSupportAndService>
      )}
    </main>
  );
}
