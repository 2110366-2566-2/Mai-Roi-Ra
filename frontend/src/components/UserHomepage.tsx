"use client";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeletePopUp from "@/components/DeletePopUp";
import { useState } from "react";
import Image from "next/image";
import EventItem from "@/components/EventItem";
import getEvents from "@/libs/getEvents";
import AdminHomepage from "@/components/AdminHomepage";

interface EventItem {
  event_id: string;
  event_name: string;
  start_date: string;
  end_date: string;
  description: string;
  city: string;
  district: string;
  event_image: string;
  // Add other fields as necessary
}

interface UserHomepageProps {
  datas: EventItem[];
}

const UserHomepage: React.FC<UserHomepageProps> = ({ datas }) => {
  return (
    <div className="text-black">
      <div className="lg:pt-8 pt-2 pl-10">
        <h1 className="font-bold lg:text-5xl text-3xl lg:mb-8 md:mb-7 mb-5">
          Explore Event
        </h1>
        <div className="flex flex-row justify-start w-full">
          <input
            type="text"
            id="search-event"
            name="search-event"
            placeholder="Search"
            className="border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[70%] md:w-[70%] w-[55%] mr-[20px] pl-2"
          />
          <button
            className="border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[80px] md:w-[80px] w-[65px] hover:scale-105 duration-300
                lg:ml-[20px] md:ml-[15px] sm:ml-[10px] ml-[10px]"
          >
            Filter
          </button>
        </div>
      </div>
      <div className="my-8 px-4 lg:px-10">
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
            page={0}
            role="USER"
          />
        ))}
      </div>
    </div>
  );
};

export default UserHomepage;
