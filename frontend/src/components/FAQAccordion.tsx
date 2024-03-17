"use client"
import React, {useState} from "react";
import Image from 'next/image';

const FAQAccordion = ({title,answer}) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className="py-2 ">
            
            <button 
            onClick={() => setAccordionOpen(!accordionOpen)} 
            className="flex justify-between w-full">
            <span className="font-base text-xl">{title}</span>
                {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
                <svg
                className="fill-black shrink-0 ml-8"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                >
                <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center transition duration-200 ease-out ${
                    accordionOpen && "!rotate-180"
                    }`}
                />
                <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                    accordionOpen && "!rotate-180"
                    }`}
                />
                </svg>
        
            </button>

            

            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-6000 text-sm ${
                accordionOpen 
                ? "grid-row-[1fr] opacity-100"
                : "grid-row-[fr] opacity-0"
            }`}>
                <div className="overflow-hidden">
                    {answer}
                </div>
            </div>

        </div>

    );
};

export default FAQAccordion;

