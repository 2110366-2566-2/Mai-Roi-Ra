import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation"
import Link from 'next/link';

interface Event {
  id:string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  imgSrc: string;
}

export default function EventItem ({event}:{event:Event}){

  return (
    <div className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-5 w-full hover:scale-[1.02] duration-300">
        <div className="flex-shrink-0 mr-4 h-full lg:w-[200px] md:w-[160px] w-[120px]">
            <Image src={event.imgSrc} 
                alt={event.name} 
                width={200} 
                height={200}
                objectFit="cover"
                className="rounded object-cover h-full" />
        </div>

        <div className='h-full flex flex-col justify-start w-full'>
            <div className='flex justify-between'>
                <h2 className="lg:text-2xl md:text-xl sm:text-md text-md  font-semibold">{event.name}</h2>
                <Link href={`/homepage/organizer/editevent/${event.id}`}>
                  <button className='border border-slate-400 rounded-xl h-[30px] w-[80px] text-sm hover:scale-105 duration-300'>
                    Edit event
                  </button>
                </Link>
            </div>
      
          <div className="lg:flex lg:flex-row lg:flex-wrap h-fit lg:justify-between lg:space-y-0 space-y-2 w-[60%] text-gray-500">
              <div className="">{`${event.startDate} - ${event.endDate}`}</div>
              <div>Location: Patumwan</div>
          </div>
          
          <div className="">
            {event.description && <div className="mt-2 hidden sm:block">{event.description}</div>}
          </div>


        </div>
    </div>
  );
};


