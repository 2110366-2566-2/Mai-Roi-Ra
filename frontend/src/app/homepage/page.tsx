import Image from "next/image";
import EventItem from "@/components/EventItem";
import getEvents from "@/libs/getEvents";

export default async function UserHomepage() {
  const events = await getEvents();
  console.log(events);
  const datas = events.event_lists;

  return (
    <main className="bg-white text-black h-full">
      <div className="pt-8 pl-10">
        <h1 className="font-bold text-5xl mb-8">Explore Events</h1>
        <div>
          <input
            type="text"
            id="search-event"
            name="search-event"
            placeholder="Search"
            className="border border-slate-400 rounded-xl h-[30px] w-[700px] mr-[20px] pl-2"
          />
          <button className="border border-slate-400 rounded-xl h-[30px] w-[80px]">
            Filter
          </button>
        </div>
      </div>
      <div className="mt-8 px-10">
        {datas.map((eventItem: any) => (
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
          />
        ))}
      </div>
    </main>
  );
}
