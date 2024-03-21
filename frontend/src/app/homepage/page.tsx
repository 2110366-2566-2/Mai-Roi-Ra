import Image from 'next/image';
import EventItem from '@/components/EventItem';
import getEvents from '@/libs/getEvents';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function UserHomepage() {

  const session = await getServerSession(authOptions)
  const events = await getEvents();
  const datas = events.event_lists;
  console.log("successfully");
  console.log(events);
  console.log(session)
  
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
