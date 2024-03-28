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
      <div className="lg:mr-24 border-r bg-white">
        <div className="w-full text-2xl pt-20 border-b">
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
        {activeTab == "Pending" && (
          <div className="border-b">
            <div className="py-6 px-4 lg:px-10">
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
                  page={2}
                  role="ADMIN"
                  status={eventItem.status}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab == "Approved" && (
          <div className="">
            <div className="py-6 px-4 lg:px-10 border-b">
              {approvedEventsDatas.map((eventItem: any) => (
                <div key={eventItem.event_id} className="relative">
                  <EventItem
                    id={eventItem.event_id}
                    name={eventItem.event_name}
                    startDate={eventItem.start_date}
                    endDate={eventItem.end_date}
                    description={eventItem.description}
                    city={eventItem.city}
                    district={eventItem.district}
                    imgSrc={eventItem.event_image}
                    page={2}
                    role="ADMIN"
                    status={eventItem.status}
                  />
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0"
                    style={{ zIndex: 10 }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab == "Rejected" && (
          <div className="">
            <div className="py-6 px-4 lg:px-10 border-b">
              {rejectedEventsDatas.map((eventItem: any) => (
                <div key={eventItem.event_id} className="relative">
                  <EventItem
                    id={eventItem.event_id}
                    name={eventItem.event_name}
                    startDate={eventItem.start_date}
                    endDate={eventItem.end_date}
                    description={eventItem.description}
                    city={eventItem.city}
                    district={eventItem.district}
                    imgSrc={eventItem.event_image}
                    page={2}
                    role="ADMIN"
                    status={eventItem.status}
                    // Add other props if necessary
                  />
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0"
                    style={{ zIndex: 10 }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupportAndService;
