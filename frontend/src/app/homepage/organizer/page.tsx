import Image from 'next/image';
import EventItem from '@/components/EventItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';
import getMyEvents from '@/libs/getMyEvents';

export default async function UserHomepage() {
    const events = await getMyEvents('550e8400-e29b-41d4-a716-446655440200');
    console.log(events);
    const datas = events.event_lists;
    
  return (
    <main className="bg-white text-black h-full">
        <div className='lg:pt-8 pt-2 pl-10'>
            <h1 className='font-bold lg:text-5xl text-3xl lg:mb-8 md:mb-7 mb-5'>My Event</h1>
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
                description={eventItem.description} city={eventItem.city} district={eventItem.district} imgSrc={eventItem.event_image} page={1}/>
                ))
            }
        </div>
        <div className="flex flex-row justify-center w-full mt-[30px] mb-[50px]">
            <Link href="/homepage/organizer/createvent">
                <button className='border border-slate-400 flex justify-center flex-row items-center rounded-full 
                lg:h-[40px] md:h-[35px] h-[35px] 
                lg:w-[140px] md:w-[110px] w-[110px] hover:scale-105 duration-300 text-black py-[10px] px-[10px]
                lg:text-[17px] md:text-[11px] text-[11px]'>
                <span className="mr-[5px]"><AddCircleOutlineIcon/></span> Add events
                </button>
            </Link>
            
        </div>
    </main>
  )
}
