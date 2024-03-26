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
import getAllPendingProblems from "@/libs/getAllPendingProblems";
import getAllRepliedProblems from "@/libs/getAllRepliedProblems";

export default async function Homepage() {
  const session = await getServerSession(authOptions);
  console.log("successfully loaded Support and Service Page");

  if (!session || !session.user || !session.user.token) return null;

  // ชั่วคราว
  // const problems = session ? await getProblems(session.user.user_id) : null;
  // ชั่วคราว
  const problems = session
    ? await getProblems("146c0931-cd29-400a-b8f5-9fd1449b3d2e")
    : null; // ชั่วคราว
  // ชั่วคราว

  const pendingProblems = session ? await getAllPendingProblems() : null;
  let pendingDatas;
  pendingDatas = pendingProblems.problem_lists;

  const repliedProblems = session ? await getAllRepliedProblems() : null;
  let repliedDatas;
  repliedDatas = repliedProblems.problem_lists;

  let datas;
  datas = problems.problem_lists;

  return (
    <main className="bg-white text-black h-full">
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
