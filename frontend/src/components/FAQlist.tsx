import React from "react";
import Accordion from "./FAQAccordion";
import Image from 'next/image';

const FAQlist = () => {
  return (
    <div>
      <div className="text-center flex flex-col items-center justify-center min-h-screen">
                <h1 className='font-bold lg:text-5xl text-3xl lg:mb-8 md:mb-7 mb-5'>Frequently Asked Questions</h1>
                <h2 className="font-base lg:text-3xl text-xl lg:mb-8 md:mb-7 mb-5">Here are some of the frequently asked questions</h2>
            </div>

      <div className="flex flex-wrap">
        <div className="w-1/2 p-4 bg-white rounded-lg mt-6 px-10">
          <Accordion
            title="How to register an event ?"
            answer="To register an event, define its purpose, date, time, and location, then choose a platform like Eventbrite. Customize the event details and registration form, promote the event, monitor registrations, and communicate with attendees."
          />
        </div>

        <div className="w-1/2 p-4 bg-white rounded-lg mt-6 px-10">
          <Accordion
            title="How to register an event ?"
            answer="To register an event, define its purpose, date, time, and location, then choose a platform like Eventbrite. Customize the event details and registration form, promote the event, monitor registrations, and communicate with attendees."
          />
        </div>

        <div className="w-1/2 p-4 bg-white rounded-lg mt-6 px-10">
          <Accordion
            title="How to register an event ?"
            answer="To register an event, define its purpose, date, time, and location, then choose a platform like Eventbrite. Customize the event details and registration form, promote the event, monitor registrations, and communicate with attendees."
          />
        </div>

        <div className="w-1/2 p-4 bg-white rounded-lg mt-6 px-10">
          <Accordion
            title="How to register an event ?"
            answer="To register an event, define its purpose, date, time, and location, then choose a platform like Eventbrite. Customize the event details and registration form, promote the event, monitor registrations, and communicate with attendees."
          />
        </div>

      </div>
  
    </div>


    
  );
};

export default FAQlist;