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
      {/* {session ? <a href="/api/auth/signout">signout</a> : <a href="/api/auth/signin">signin</a>} */}
        <div className='lg:pt-8 pt-2 pl-10'>
            <h1 className='font-bold lg:text-5xl text-3xl lg:mb-8 md:mb-7 mb-5'>Explore Event</h1>
            <div className="flex flex-row justify-start w-full">
                <input type="text" id="search-event" name="search-event" placeholder="Search" 
                    className='border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[70%] md:w-[70%] w-[55%] mr-[20px] pl-2'
                />
                <button className='border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[80px] md:w-[80px] w-[65px] hover:scale-105 duration-300
                lg:ml-[20px] md:ml-[15px] sm:ml-[10px] ml-[10px]'>
                    Filter
                </button>
            </div>
        </div>
        <div className="my-8 px-4 lg:px-10">
          {
            datas.map((eventItem:any) => (
              <EventItem key={eventItem.event_id} id={eventItem.event_id} name={eventItem.event_name} startDate={eventItem.start_date} endDate={eventItem.end_date}
              description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image} page={0}/>
            ))
          }
        </div>
    </main>
  )
}
