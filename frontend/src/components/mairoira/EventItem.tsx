import React from 'react';
import Image from 'next/image';

interface Event {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  imgSrc: string;
}

export default function EventItem ({event}:{event:Event}){
  return (
    <div className="flex items-center my-4 shadow-md h-[200px] p-5 w-full">
        <div className="flex-shrink-0 mr-4 h-full w-[200px]">
            <Image src={event.imgSrc} 
                alt={event.name} 
                width={200} 
                height={200}
                objectFit="cover"
                className="rounded object-cover h-full" />
        </div>
        <div className='h-full flex flex-col justify-start w-full'>
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold">{event.name}</h2>
                <button className='border border-slate-400 rounded-xl h-[30px] w-[80px] text-sm'>Edit event</button>
            </div>
            
            <p className="text-gray-500">{`${event.startDate} - ${event.endDate}`}</p>
            <p className="mt-2">{event.description}</p>
        </div>
    </div>
  );
};


