import EditEventForm from "@/components/EditEventForm";
import getEvent from "@/libs/getEvent";
import DeleteEventButton from "@/components/DeleteEventButton";

interface Props {
    params : {eid:string}
}

export default async function EditEvent({params}: Props) {
    const event = await getEvent(params.eid);

    console.log(event);
    return (
        <div className='lg:pt-8 pt-2 px-10 text-black'>
            {/* Topic */}
            <div className="flex flex-row justify-between">
                <h1 className='font-bold lg:text-5xl text-3xl lg:mb-[50px] md:mb-7 mb-5'>Edit Event</h1>
                <DeleteEventButton id={params.eid}/>
            </div>

            {/* Form */}
            <div className="">
                <EditEventForm Id={event.event_id} Name={event.event_name}  Activity={event.activities} StartDate={event.start_date} EndDate={event.end_date}
                    Price={event.participant_fee} Location={event.location_name} District={event.district}
                    Province={event.country} Description={event.description} ImgSrc={event.event_image} Status={event.status}/>
            </div> 

        </div>
    )
}