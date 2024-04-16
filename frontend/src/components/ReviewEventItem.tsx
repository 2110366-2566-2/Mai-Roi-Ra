"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from '@mui/material/Rating';
import LoadingCircular from "./LoadingCircular";

interface Props {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  imgSrc: string;
  district: string;
  average_rating:number;
  role: string;
}

export default function ReviewEventItem({
  id,
  name,
  startDate,
  endDate,
  description,
  imgSrc,
  district,
  average_rating,
  role
}: Props) {
  const router = useRouter();

  const startyear = startDate.substring(0, 4);
  const startmonth = startDate.substring(4, 6);
  const startday = startDate.substring(6, 8);

  const startdateObj = new Date(`${startyear}-${startmonth}-${startday}`);
  const formattedStartDate = startdateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const endyear = endDate.substring(0, 4);
  const endmonth = endDate.substring(4, 6);
  const endday = endDate.substring(6, 8);

  const enddateObj = new Date(`${endyear}-${endmonth}-${endday}`);
  const formattedEndDate = enddateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50">
          <LoadingCircular></LoadingCircular>
        </div>
      )}
      <div
        className="rounded-xl flex jestify-start items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-5 w-full hover:scale-y-105 hover:shadow-gray-500 hover:shadow-y-xl duration-300"
        onClick={(e) => {
          setIsLoading(true);
          e.stopPropagation();
          e.preventDefault();
          router.push(`/events/review/organizer/${id}`);
        }}
      >
        <div className="flex-shrink-0 mr-4 h-full lg:w-[200px] md:w-[160px] w-[120px]">
          <Image
            src={imgSrc}
            alt={name}
            width={200}
            height={200}
            objectFit="cover"
            className="rounded object-cover h-full"
          />
        </div>

        <div className="h-full flex flex-row justify-between w-full space-y-[7px]">
          <div className="w-[70%]">
              <h2 className="lg:text-2xl md:text-xl sm:text-md text-md  font-semibold">
                {name}
              </h2>

              <div className="lg:flex lg:flex-row lg:flex-wrap h-fit lg:justify-between lg:space-y-0 space-y-1 sm:space-y-2 w-full text-gray-500 sm:!mt-2 !mt-0">
                <div className="text-nowrap	hidden xl:block">{`${formattedStartDate} - ${formattedEndDate}`}</div>
                    <div className="text-nowrap hidden xl:block">
                    Location: {district}
                    </div>
                </div>

                <div className="xl:block hidden">
                    {description && (
                    <div className="hidden lg:block break-words 2xl:pr-96 xl:pr-64 lg:pr-48 md:pr-24 pr-4 mt-1">
                        <p>Event Description:</p>
                        <p className="ml-2 text-wrap break-words">
                        {description.length > 150
                           ? `${description.substring(0, 150)}...`
                            : description}
                        </p>
                    </div>
                    )}
                </div>
            </div>
        </div>

        <div className="w-[30%] h-full">
            <div className="w-full flex flex-row justify-end items-start">
                {role == 'USER' ?
                    <button className="text-xs sm:text-sm border border-slate-400 rounded-full h-[24px] sm:h-[30px] 
                    w-fit px-[10px] hover:scale-105 duration-300"
                    onClick={() => {router.push('/')}}>
                        Review
                    </button> :

                    <button className="text-xs sm:text-sm border border-slate-400 rounded-full h-[24px] sm:h-[30px] 
                    w-fit px-[10px] hover:scale-105 duration-300"
                    onClick={() => {router.push(`/events/review/organizer/${id}`)}}>
                        Review
                    </button>
                }

            </div>

            <div className="w-full flex flex-row justify-end items-start mt-3">
                <Rating name="read-only" value={average_rating} precision={0.01} readOnly />
            </div>
        </div>
      </div>
    </div>
  );
}