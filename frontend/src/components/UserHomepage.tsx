import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EventItem from '@/components/EventItem';
import SearchBar from '@/components/SearchBar';
import getEvents from '@/libs/getEvents';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

interface Props {
    page: number;
    limit: number;
    search: string;
}

export default async function UserHomepage({page,limit,search} : Props) {
  const events = await getEvents({offset : page , limit : limit , search : search});
  const datas = events.event_lists;
  const session = getServerSession(authOptions);
  
  console.log(events);
  return (
    <main className="text-black flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<div className="flex justify-center items-center w-full h-full text-[40px]">Loading...</div>}>
          <div className='flex-shrink-0 pt-8 px-10'>
              <h1 className='font-bold lg:text-5xl md:text-4xl text-3xl lg:mb-8 mb-5'>Explore Event</h1>
              <SearchBar page={events.total_pages > 0 ? page : 0} last_page={events.total_pages} search={search}/>
          </div>

          { events.total_events > 0 ?
              <div className='bg-white py-[5px] mt-[20px] overflow-y-auto'>
              {datas.map((eventItem:any) => (
              <EventItem key={eventItem.event_id} id={eventItem.event_id} name={eventItem.event_name} startDate={eventItem.start_date} endDate={eventItem.end_date}
                description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image} page={0}/>
              ))}
              </div> :
              <div className='h-[50%] items-center flex justify-center flex-row w-full text-[25px] text-gray-500'>
                <div className="w-full text-center space-y-[20px]">
                  <SearchOffIcon className="text-[100px]"/>
                  <div>
                    No Search Result
                  </div>
                </div>
              </div>
          }
      </Suspense> 
    </main>
  )
}
