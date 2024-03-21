import HomepageUser from "@/components/HomepageUser";
import Image from "next/image";
import EventItem from "@/components/EventItem";
import getEvents from "@/libs/getEvents";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHomepage from "@/components/AdminHomepage";
import UserHomepage from "@/components/UserHomepage";
import getWaitingEvents from "@/libs/getWaitingEvents";
import getApprovedEvents from "@/libs/GetApprovedEvents";
import getRejectedEvents from "@/libs/getRejectedEvents";

export default async function Homepage() {
  const session = await getServerSession(authOptions);
  // const events = await getEvents();
  const datas = events.event_lists;
  console.log("successfully");
  console.log(events);
  console.log(session);

  const waitingEvents = await getWaitingEvents();
  const waitingEventsDatas = waitingEvents.event_lists;

  const approvedEvents = await getApprovedEvents();
  const approvedEventsDatas = approvedEvents.event_lists;

  const rejectedEvents = await getRejectedEvents();
  const rejectedEventsDatas = rejectedEvents.event_lists;

  return (
    <main className="bg-white text-black h-full">
      {session?.user.role == "ADMIN" ? (
        <AdminHomepage
          waitingEventsDatas={waitingEventsDatas}
          approvedEventsDatas={approvedEventsDatas}
          rejectedEventsDatas={rejectedEventsDatas}
        ></AdminHomepage>
      ) : (
        <UserHomepage datas={datas}></UserHomepage>
      )}
    </main>
  );
}
