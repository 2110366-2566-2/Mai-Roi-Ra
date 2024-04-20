"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnnouncementPopup from "./AnnouncementPopup";
import LoadingCircular from "./LoadingCircular";
import { formatDate } from '../action/FormatEventDate';


interface Props {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  city: string;
  district: string;
  imgSrc: string;
  page: number;
  role: string;
  status: string;
}

export default function EventItem({
  id,
  name,
  startDate,
  endDate,
  description,
  city,
  district,
  imgSrc,
  page,
  role,
  status,
}: Props) {
  const eventPath = role == "ADMIN" ? "verifyevents" : "events";
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // if status = "Waiting" then set to "Pending"
  const [shownStatus, setShownStatus] = useState(status);
  let statusStyle = "";
  if (shownStatus == "Waiting") {
    setShownStatus("Pending");
  } else if (shownStatus == "Pending") {
    statusStyle = "text-yellow-500 border-yellow-500";
  } else if (shownStatus == "Approved") {
    statusStyle = "text-green-400 border-green-400";
  } else {
    statusStyle = "text-red-500 border-red-400";
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50">
          <LoadingCircular></LoadingCircular>
        </div>
      )}
      <div
        className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-5 w-full hover:scale-y-105 hover:shadow-gray-500 hover:shadow-y-xl duration-300"
        onClick={(e) => {
          setIsLoading(true);
          e.stopPropagation();
          e.preventDefault();
          router.push(`/${eventPath}/${id}`);
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

        <div className="h-full flex flex-col justify-start w-full space-y-[7px]">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <h2 className="lg:text-2xl md:text-xl sm:text-md text-md  font-semibold">
                {name}
              </h2>
              {page == 1 || page == 2 ? (
                <div className="space-x-2">
                  <button
                    className={`${statusStyle} border rounded-xl h-[24px] w-[72px] sm:h-[30px] sm:w-[80px] text-xs sm:text-sm`}
                  >
                    {shownStatus}
                  </button>
                </div>
              ) : null}
            </div>
            {page == 1 ? (
              <div className="space-x-2">
                <button
                  className="hidden sm:block text-xs sm:text-sm border border-slate-400 rounded-xl h-[24px] w-[64px] sm:h-[30px] sm:w-[80px] text-sm hover:scale-105 duration-300"
                  onClick={(e) => {
                    setIsLoading(true);
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`/homepage/editevent/${id}`);
                  }}
                >
                  Edit event
                </button>
              </div>
            ) : null}
          </div>

          <div className="lg:flex lg:flex-row lg:flex-wrap h-fit lg:justify-between lg:space-y-0 space-y-1 sm:space-y-2 w-full text-gray-500 sm:!mt-2 !mt-0">
            <div className="text-nowrap	hidden xl:block">{`${formattedStartDate} - ${formattedEndDate}`}</div>
            <div className="text-nowrap hidden xl:block">
              Location: Patumwan
            </div>

            {page == 1 ? (
              <div className="space-x-2">
                <button
                  className="sm:hidden block text-black text-xs sm:text-sm border border-slate-400 rounded-xl h-[24px] w-[72px] sm:h-[30px] sm:w-[80px] text-sm hover:scale-105 duration-300"
                  onClick={(e) => {
                    setIsLoading(true);
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`/homepage/editevent/${id}`);
                  }}
                >
                  Edit event
                </button>
              </div>
            ) : null}
            {page == 1 ? (
              <div className="space-x-2 text-black">
                <button
                  className="text-xs sm:text-sm border border-slate-400 rounded-xl h-[24px] sm:h-[30px] w-fit px-[6px] hover:scale-105 duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  Announcement
                </button>
              </div>
            ) : null}
          </div>

          <div className="xl:block hidden">
            {description && (
              <div className="hidden lg:block break-words 2xl:pr-96 xl:pr-64 lg:pr-48 md:pr-24 pr-4">
                <p className="text-wrap break-words">
                  {description.length > 150
                    ? `${description.substring(0, 150)}...`
                    : description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnnouncementPopup
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        id={id}
        name={name}
      />
    </div>
  );
}
