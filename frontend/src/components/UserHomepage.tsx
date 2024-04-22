import EventItem from '@/components/EventItem';
import SearchBar from '@/components/SearchBar';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface Event {
  event_id:string;
  event_name:string;
  start_date:string;
  end_date:string;
  description:string;
  status:string;
  event_image:string;
  city:string;
  district:string;
}

interface History{
  user_id:string;
  search_name:string;
}

interface Histories {
  search_history:History[]
}

interface Events {
  total_pages:number;
  total_events:number;
  event_lists:Event[];
}

interface Props {
  page:number;
  search:string;
  events:Events;
  history:Histories;
}

export default function UserHomepage({page,search,events,history} : Props) {
  const datas = events.event_lists;
  console.log(history);

  return (
    <main className="text-black flex flex-col h-screen overflow-hidden">
          <div className='flex-shrink-0 lg:pt-8 md:pt-5 pt-4 px-10'>
              <h1 className='font-bold lg:text-5xl md:text-4xl text-3xl lg:mb-8 md:mb-5 mb-4'>Explore Event</h1>
              <SearchBar page={events.total_pages > 0 ? page : 0} last_page={events.total_pages} search={search} history={history.search_history}/>
          </div>

          { events.total_events > 0 ?
              <div className='py-[5px] md:mt-[20px] mt-[5px] overflow-y-auto'>
              {datas.map((eventItem:any) => (
              <EventItem
                key={eventItem.event_id}
                id={eventItem.event_id}
                name={eventItem.event_name}
                startDate={eventItem.start_date}
                endDate={eventItem.end_date}
                description={eventItem.description}
                city={eventItem.city}
                district={eventItem.district}
                imgSrc={eventItem.event_image}
                page={0}
                role="USER"
                status={eventItem.item}
            />
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
    </main>
  )
}
