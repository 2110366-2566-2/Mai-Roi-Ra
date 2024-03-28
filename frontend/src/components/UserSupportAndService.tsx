"use client";
import React, { Suspense, useState } from "react";
import FAQlist from "./FAQlist";
import ProblemList from "./ProblemList";
import ReportProblemButton from "./ReportProblemButton";
import UserSupportAndServiceSkeleton from "./skeletons/UserSupportAndServiceSkeleton";
// Other imports...
interface Props {
  datas: any[];
}

export default function UserSupportAndService({ datas }: Props) {
  const [activeTab, setActiveTab] = useState("FAQ");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white text-black">
      <Suspense
        fallback={
          <UserSupportAndServiceSkeleton></UserSupportAndServiceSkeleton>
        }
      >
        <div className="lg:mr-24 border-r border-b bg-white">
          <div className="w-full text-2xl pt-20 border-b">
            {["FAQ", "Problem"].map((tabName) => (
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
          {activeTab == "FAQ" && <FAQlist></FAQlist>}
          {activeTab == "Problem" && <ProblemList datas={datas}></ProblemList>}
        </div>
      </Suspense>
    </div>
  );
}
