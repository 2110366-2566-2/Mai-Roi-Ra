"use client";
import React from "react";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { data } from "cypress/types/jquery";
import { TbZoomCancel } from "react-icons/tb";

interface Props {
  datas: any[];
  role: string;
}

export default function EventsList({ datas, role }: Props) {
  let roleToNumber: number; // USER = 0; ORGANIZER = 1;
  roleToNumber = role === "ORGANIZER" ? 1 : 0;
  // Function to convert date format to match the API
  const convertDateFormat = (dateString: string) => {
    const parts = dateString.split("/");
    return parts[0] + parts[2] + parts[1];
  };
  console.log(datas);
  return (
    <div className="w-full">
      {datas.length == 0 && (
        <div className="text-slate-400 mt-16 w-full flex flex-col justify-center items-center space-y-4">
          <div className="text-7xl">
            <TbZoomCancel />
          </div>
          <p className="text-xl">No events found</p>
        </div>
      )}
      <div className="mt-8 px-10">
        {datas.map((eventItem: any) => (
          <EventItem
            key={eventItem.event_id}
            id={eventItem.event_id}
            name={eventItem.event_name}
            startDate={convertDateFormat(eventItem.start_date)}
            endDate={convertDateFormat(eventItem.end_date)}
            description={eventItem.description}
            city={eventItem.city}
            district={eventItem.district}
            imgSrc={eventItem.event_image}
            page={roleToNumber}
            role="USER"
            status={eventItem.status}
          />
        ))}
      </div>
      {role == "ORGANIZER" && (
        <div className="flex flex-row justify-center w-full mt-[30px] mb-[50px]">
          <Link href="/homepage/createvent">
            <button
              className="border border-slate-400 flex justify-center flex-row items-center rounded-full 
                lg:h-[40px] md:h-[35px] h-[35px] 
                lg:w-[140px] md:w-[110px] w-[110px] hover:scale-105 duration-300 text-black py-[10px] px-[10px]
                lg:text-[17px] md:text-[11px] text-[11px]"
            >
              <span className="mr-[5px]">
                <AddCircleOutlineIcon />
              </span>{" "}
              Add events
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
