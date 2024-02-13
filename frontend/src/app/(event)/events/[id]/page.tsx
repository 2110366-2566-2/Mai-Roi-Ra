import { revalidateTag } from "next/cache";
import Image from "next/image";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StarIcon from '@mui/icons-material/Star';
import getEvent from "@/libs/getEvent";
import Link from "next/link";
import RegisterEventBox from "@/components/RegisterEventBox";

interface Props {
    params: {id:string}
}

export default async function EventDetailPage({ params }: Props) {
    const event = await getEvent(params.id);

    return (
        <main className="mx-auto lg:mx-16 px-4 py-0 lg:py-4 h-screen w-full text-black">
            <Link className="absolute top-[38px] left-8 flex items-center justify-center hover:scale-[1.2] duration-300" href={"/homepage"}><ArrowBackIosNewIcon className="text-[#1DA1F2]"/></Link>
            <div className="lg:mx-16">
                <h1 className="text-3xl font-semibold my-4 w-full">{event.event_name}</h1>
                <div className="flex flex-wrap items-start flex-col w-auto w-full lg:flex-row">
                    <div className="h-full flex flex-col w-auto max-w-[750px] lg:mr-20">
                        <div className="w-full lg:w-[750px] xl:w-full h-auto overflow-hidden">
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
                    <div className="mt-8 lg:mt-0 w-full lg:w-[400px] flex justify-center">
                        <RegisterEventBox event={event}/>
                    </div>
                </div>
            </div>
        </main>
    );
}