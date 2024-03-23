"use client";
import React, { useState } from "react";
import EventItem from "@/components/EventItem";
// Other imports...

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

interface AdminSupportAndServiceProps {
  waitingEventsDatas: EventItem[];
  approvedEventsDatas: EventItem[];
  rejectedEventsDatas: EventItem[];
}

const AdminSupportAndService: React.FC<AdminSupportAndServiceProps> = ({
  waitingEventsDatas,
  approvedEventsDatas,
  rejectedEventsDatas,
}) => {
  const [activeTab, setActiveTab] = useState("Pending");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white text-black h-full">
      <div className="lg:mr-24 border-r border-b bg-white">
        <div className="w-full text-2xl pt-20">
          {["Pending", "Approved", "Rejected"].map((tabName) => (
            <button
              key={tabName}
              className={`relative px-8 py-2 overflow-hidden`}
              onClick={() => handleTabClick(tabName)}
            >
              <span
                className={`transition duration-500 ease-in-out ${
                  activeTab === tabName
                    ? "text-yellow-500"
                    : "text-gray-800 hover:text-gray-500"
                }`}
              >
                {tabName}
              </span>
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-yellow-500 transition-all duration-500 ease-out ${
                  activeTab === tabName ? "scale-x-100" : "scale-x-0"
                }`}
                style={{
                  transformOrigin: "center",
                }}
              ></span>
            </button>
          ))}
        </div>
      </div>
      {activeTab == "Pending" && (
        <div className="my-8 px-4 lg:px-10">
          {waitingEventsDatas.map((eventItem: any) => (
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
              page={1}
            />
          ))}
        </div>
      )}
      {activeTab == "Approved" && (
        <div className="my-8 px-4 lg:px-10">
          {approvedEventsDatas.map((eventItem: any) => (
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
              page={1}
            />
          ))}
        </div>
      )}
      {activeTab == "Rejected" && (
        <div className="my-8 px-4 lg:px-10">
          {rejectedEventsDatas.map((eventItem: any) => (
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
              page={1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSupportAndService;
