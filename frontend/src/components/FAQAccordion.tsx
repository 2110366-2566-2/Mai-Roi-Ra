"use client"
import React, {useState} from "react";
import Image from 'next/image';

const FAQAccordion = ({ title, answer }: {title: string, answer: string}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        style={{ cursor: "pointer" }} // Set cursor pointer as default
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-yellow-500" // Set yellow color for the question icon
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform ${accordionOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {accordionOpen && (
        <div className="mt-4">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;








