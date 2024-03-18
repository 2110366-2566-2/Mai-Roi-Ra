import EventItem from '@/components/EventItem';
import SearchBar from '@/components/SearchBar';
import getEvents from '@/libs/getEvents';
import { Suspense } from 'react';

export default async function Homepage(
  {
    searchParams,
  } : {
      searchParams: { offset : string | undefined , 
        limit : string | undefined}
  }
) {
  const page = Number(searchParams.offset ?? '1');
  const limit = Number(searchParams.limit ?? '2');

  const events = await getEvents({offset : page , limit : limit});
  const datas = events.event_lists;

  return (
    <main className="text-black flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<div className="flex justify-center items-center w-full h-full text-[40px]">Loading...</div>}>

          <div className='flex-shrink-0 pt-8 px-10'>
              <h1 className='font-bold text-5xl lg:mb-8 mb-3'>Explore Event</h1>
              <SearchBar page={page} limit={limit}/>
          </div>

          <div className='bg-white py-[5px] mt-[20px] overflow-y-auto'>
           {datas.map((eventItem:any) => (
            <EventItem key={eventItem.event_id} id={eventItem.event_id} name={eventItem.event_name} startDate={eventItem.start_date} endDate={eventItem.end_date}
             description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image} page={0}/>
           ))}
          </div>

      </Suspense> 
    </main>
  )
}
