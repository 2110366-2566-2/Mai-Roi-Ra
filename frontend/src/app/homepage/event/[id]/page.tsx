import { revalidateTag } from "next/cache";
import Image from "next/image";
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationIcon from '@mui/icons-material/Place';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import AddGuestIcon from '@mui/icons-material/GroupAdd';
import StarIcon from '@mui/icons-material/Star';
import getEvent from "@/libs/getEvent";

interface Props {
    params: {id:string}
}

export default async function EventDetailPage({ params }: Props) {
    const event = await getEvent(params.id);

    return (
        <main className="container mx-16 px-4 py-0 lg:py-4 h-screen">
            <button className="absolute top-[38px] left-8 flex items-center justify-center"><ArrowBackIosNewIcon className="text-[#1DA1F2]"/></button>
            <h1 className="text-3xl font-semibold my-4 w-full">{event.event_name}</h1>
            <div className="flex flex-wrap items-start flex-row w-full justify-center gap-20">
                <div className="h-full flex flex-col">
                    <div className="w-full lg:w-[750px] xl:w-full h-[400px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                width={800} 
                                height={400}
                                alt='event image'
                                className="object-cover w-full h-full rounded-lg"
                            />
                    </div>
                    <div className="w-full lg:w-[750px] mt-4 border-b border-slate-300 pb-4">
                        <h2 className=" text-lg font-semibold">Description</h2>
                        <p className="text-lg text-gray-800">
                            {event.description}
                        </p>
                        <p className="flex items-center"><StarIcon /> 4.88 | 172 Reviews</p>
                    </div>
                    <div className="w-full lg:w-[750px] mt-4 flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full overflow-hidden mr-6">
                            <Image
                                className="object-cover w-full h-full"
                                src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Profile"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <label className="font-semibold">{'ลุงสุรินทร์'}</label>
                            <label className="text-md text-slate-600">Hosted {8} Events</label>
                        </div>
                    </div>
                </div>
                <div className="mt-8 lg:mt-0">
                    <div className="flex mb-2 border rounded-lg p-4 flex flex-col w-full lg:w-[400px] h-auto shadow-xl">
                        <div>
                            <span className="text-2xl font-semibold">{event.price}</span>
                            <div className="w-full border rounded-lg flex flex-col h-auto mt-4">
                                <div className="w-full h-auto border flex flex-col p-4">
                                    <span className="w-full font-semibold flex items-center mb-4"><LocationIcon className="mr-2"/>Location</span>
                                    <label>{event.location_name + " " + event.district + " " + event.city + " " + event.country}</label>
                                </div>
                                <div className="w-full h-auto border flex flex-col p-4">
                                    <span className="w-full font-semibold flex items-center mb-4"><CalendarIcon className="mr-2"/>Date</span>
                                    <label>{event.start_date + " - " + event.end_date}</label>
                                </div>
                                <div className="w-full h-[50px] border flex items-center justify-between p-4">
                                    <span className="font-semibold flex items-center"><AddGuestIcon className="mr-2"/>Guest</span>
                                    <div className="">
                                        <button className="h-full mx-2"><MinusIcon className="text-slate-300 hover:text-black"/></button>
                                        <label className="mx-3">{1}</label>
                                        <button className="h-full mx-2"><PlusIcon className="text-slate-300 hover:text-black"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between my-4">
                                <label className="px-1">Total fee {1} person</label>
                                <label className="px-1">{event.participant_fee} $</label>
                            </div>
                        </div>
                        <button className="rounded-lg text-center w-full h-full bg-[#F2D22E] p-4">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}