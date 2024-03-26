"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProblemPopUp from "./ProblemPopUp";
import getProblem from "@/libs/getProblem";

interface Props {
  id: string;
  problem: string;
  description: string;
  status: string;
  reply: string;
  role: string;
}

export default function ProblemItem({
  id,
  problem,
  description,
  status,
  reply,
  role,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  let statusStyle = "";
  if (status == "Pending") {
    statusStyle = "text-yellow-500 border-yellow-500";
  } else if (status == "Replied") {
    statusStyle = "text-green-400 border-green-400";
  }

  return (
    <div className="relative">
      {" "}
      {/* Container with relative positioning */}
      <div className="bg-white flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-10 w-full hover:scale-105 duration-300">
        {role == "USER" && (
          <div
            className="h-full flex flex-col justify-start w-full space-y-[7px] mx-10"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowModal(true);
            }}
          >
            <div className="flex justify-between">
              <h2 className="lg:text-2xl md:text-xl sm:text-md text-md font-semibold">
                {problem}
              </h2>
              <div className="space-x-2">
                <button
                  className={`${statusStyle} border rounded-xl h-[30px] w-[80px] text-sm`}
                >
                  {status}
                </button>
              </div>
            </div>

            <div className="">
              {description && (
                <div className="break-words">
                  <p className="text-wrap break-words">{description}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {role == "ADMIN" && (
          <div
            className="h-full flex flex-col justify-start w-full space-y-[7px] mx-10"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              router.push(`/replyproblems/${id}`);
            }}
          >
            <div className="flex justify-between">
              <h2 className="lg:text-2xl md:text-xl sm:text-md text-md font-semibold">
                {problem}
              </h2>
              <div className="space-x-2">
                <button className="border border-slate-400 rounded-xl h-[30px] w-[80px] text-sm hover:scale-105 duration-300">
                  {status}
                </button>
              </div>
            </div>

            <div className="">
              {description && (
                <div className="hidden sm:block break-words">
                  <p className="text-wrap break-words">{description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ProblemPopUp
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        id={id}
        problem={problem}
        description={description}
        reply={reply}
      />
    </div>
  );
}
