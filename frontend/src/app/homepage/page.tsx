import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AdminHomepage from "@/components/AdminHomepage";
import getWaitingEvents from "@/libs/getWaitingEvents";
import getApprovedEvents from "@/libs/getApprovedEvents";
import getRejectedEvents from "@/libs/getRejectedEvents";
import UserHomepage from "@/components/UserHomepage";

export default async function Homepage({
  searchParams,
}: {
  searchParams: {
    offset: string | undefined;
    limit: string | undefined;
    search: string | undefined;
  };
}) {
  const page = Number(searchParams.offset ?? "1");
  const limit = Number(searchParams.limit ?? "5");
  const search = searchParams.search ?? "";

  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null

  const waitingEvents = await getWaitingEvents(session!.user.token);
  const waitingEventsDatas = waitingEvents.event_lists;

  const approvedEvents = await getApprovedEvents(session!.user.token);
  const approvedEventsDatas = approvedEvents.event_lists;

  const rejectedEvents = await getRejectedEvents(session!.user.token);
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
        <UserHomepage page={page} limit={limit} search={search} />
      )}
    </main>
  );
}
