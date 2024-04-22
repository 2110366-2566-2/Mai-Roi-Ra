import Image from "next/image";
import EventItem from "@/components/EventItem";
import getEvents from "@/libs/getEvents";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AdminHomepage from "@/components/AdminHomepage";
import UserHomepage from "@/components/UserHomepage";
import AdminSupportAndService from "@/components/AdminSupportAndService";
import UserSupportAndService from "@/components/UserSupportAndService";
import getProblems from "@/libs/getProblems";
import getAllPendingProblems from "@/libs/getAllPendingProblems";
import getAllRepliedProblems from "@/libs/getAllRepliedProblems";
import { revalidateTag } from "next/cache";

export default async function Homepage() {
  const session = await getServerSession(authOptions);
  console.log("successfully loaded Support and Service Page");

  if (!session || !session.user || !session.user.token) return null;
  const problems = session
    ? await getProblems(session.user.user_id, session.user.token)
    : null;

  let datas;
  datas = problems.problem_lists;

  const pendingProblems = session
    ? await getAllPendingProblems(session.user.token)
    : null;
  let pendingDatas;
  pendingDatas = pendingProblems.problem_lists;

  const repliedProblems = session
    ? await getAllRepliedProblems(session.user.token)
    : null;
  let repliedDatas;
  repliedDatas = repliedProblems.problem_lists;

  return (
    <main className="bg-white text-black">
      {session?.user.role == "ADMIN" ? (
        <AdminSupportAndService
          pendingDatas={pendingDatas}
          repliedDatas={repliedDatas}
        ></AdminSupportAndService>
      ) : (
        <UserSupportAndService datas={datas}></UserSupportAndService>
      )}
    </main>
  );
}
