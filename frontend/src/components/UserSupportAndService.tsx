import Link from "next/link";
import React, { useState } from "react";
import FAQlist from "./FAQlist";
import ProblemList from "./ProblemList";
import ReportProblemPage from "./ReportProblemPage";
// Other imports...

export default function UserSupportAndService() {

  return (
    <div className="bg-white text-black h-full">
      <div className="lg:mr-24 border-r border-b bg-white">
        <div className="w-full text-2xl pt-20">
          {["FAQ", "Problem"].map((tabName) => (
            <Link href={`/supportandservice/${tabName.toLowerCase()}`}
              key={tabName}
              className={`relative px-8 py-2 overflow-hidden`}
            >
              <span
                className={`transition duration-500 ease-in-out
                `}
              >
                {tabName}
              </span>
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-yellow-500 transition-all duration-500 ease-out`}
                style={{
                  transformOrigin: "center",
                }}
              ></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
