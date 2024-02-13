import Image from 'next/image';
import EventItem from '@/components/EventItem';
import getEvents from '@/libs/getEvents';

export default async function UserHomepage() {
  console.log("dqdqqdq");
  const events = await getEvents();
  const datas = events.event_lists;
  console.log("successfully");
  console.log(events);
  
  return (
    <main className="bg-white text-black h-full">
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
        <div className="mt-8 px-10">
          {
            datas.map((eventItem:any) => (
              <EventItem key={eventItem.event_id} id={eventItem.event_id} name={eventItem.event_name} startDate={eventItem.start_date} endDate={eventItem.end_date}
              description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image}/>
            ))
          }
           {/* <div className="text-[200px] text-center"> {datas[0].event_name} </div>
          {
            datas.map((eventItem:any)=>{
              <div className="text-center text-[600px]">
                {eventItem.event_name}
              </div>
              // <EventItem key={eventItem.event_id} id={eventItem.event_name} name={eventItem.event_name} startDate={eventItem.start_date} endDate={eventItem.end_date}
              // description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image}/>
            })
          } */}
        </div>
    </main>
  )
}
