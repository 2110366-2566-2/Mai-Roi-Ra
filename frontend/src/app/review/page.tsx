import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewEventItem from "@/components/ReviewEventItem";
import getEvents from "@/libs/getEvents";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { getServerSession } from "next-auth";

const ReviewPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    const user = session.user;
    const events = await getEvents({});
    const datas = events.event_lists;
    console.log(events);
    console.log('Success to get Session');
    console.log('Success to render organizer review page');

    return (
        <div className="w-full h-screen">
            <div className="w-full lg:border-b lg:pt-[120px]"></div>
            <div className="w-full px-[20px]">
                { events.total_events > 0 ?
                    <div className='py-[5px] md:mt-[15px] overflow-y-auto'>
                        {datas.map((eventItem:any) => (
                        <ReviewEventItem
                            key={eventItem.event_id}
                            id={eventItem.event_id}
                            name={eventItem.event_name}
                            startDate={eventItem.start_date}
                            endDate={eventItem.end_date}
                            description={eventItem.description}
                            imgSrc={eventItem.event_image}
                            district={eventItem.district}
                            role={user.role}
                        />
                        ))}
                    </div> :

                    <div className='h-[50%] items-center flex justify-center flex-row w-full text-[25px] text-gray-500'>
                        <div className="w-full text-center space-y-[20px]">
                            <SearchOffIcon className="text-[100px]"/>
                            <div>
                                No Review Event
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ReviewPage;