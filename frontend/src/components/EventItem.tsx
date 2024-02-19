'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation"
import AnnouncementPopup from './AnnouncementPopup';

interface Props {
  id:string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  city:string;
  district:string;
  imgSrc: string;
  page:number;
}

export default function EventItem ({id,name,startDate,endDate,description,city,district,imgSrc,page} : Props){
  const [showModal,setShowModal] = useState(true); 
  const router = useRouter();

  const startyear = startDate.substring(0, 4);
  const startmonth = startDate.substring(4, 6);
  const startday = startDate.substring(6, 8);

  const startdateObj = new Date(`${startyear}-${startmonth}-${startday}`);
  const formattedStartDate = startdateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
  });

  const endyear = endDate.substring(0, 4);
  const endmonth = endDate.substring(4, 6);
  const endday = endDate.substring(6, 8);

  const enddateObj = new Date(`${endyear}-${endmonth}-${endday}`);
  const formattedEndDate = enddateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
  });

  return (
    <div className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-5 w-full hover:scale-[1.02] duration-300"
    onClick={(e) => {
      router.push(`/events/${id}`);
      e.stopPropagation();
      e.preventDefault();
      }}>
        <div className="flex-shrink-0 mr-4 h-full lg:w-[200px] md:w-[160px] w-[120px]">
            <Image src={imgSrc} 
                alt={name} 
                width={200} 
                height={200}
                objectFit="cover"
                className="rounded object-cover h-full" />
        </div>

        <div className='h-full flex flex-col justify-start w-full'>
            <div className='flex justify-between'>
                <h2 className="lg:text-2xl md:text-xl sm:text-md text-md  font-semibold">{name}</h2>
                {
                  page == 1 ?  
                  <div className="space-x-2">
                      <button className='border border-slate-400 rounded-xl h-[30px] w-[80px] text-sm hover:scale-105 duration-300'
                    onClick = {(e) => {
                      router.push(`/homepage/editevent/${id}`);
                      e.stopPropagation();
                    }}>
                      Edit event
                    </button> 
                    <button className='border border-slate-400 rounded-xl h-[30px] w-fit px-[5px] text-sm hover:scale-105 duration-300'
                    onClick = {(e) => {
                      setShowModal(true);
                      e.stopPropagation();
                      e.preventDefault();
                    }}>
                        Announcement
                    </button>
                  </div>
                  : null
                }
            </div>
      
          <div className="lg:flex lg:flex-row lg:flex-wrap h-fit lg:justify-between lg:space-y-0 space-y-2 w-[60%] text-gray-500">
              <div className="text-nowrap	">{`${formattedStartDate} - ${formattedEndDate}`}</div>
              <div className="text-nowrap">Location: Patumwan</div>
          </div>
          
          <div className="">
            {description && <div className="mt-2 hidden sm:block break-words"><p className='text-wrap break-words'>{description}</p></div>}
          </div>


        </div>
        <AnnouncementPopup isVisible={showModal} onClose={()=>setShowModal(false)} id={id} name={name}/>
    </div>
  );
};


