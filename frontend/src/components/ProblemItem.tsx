<<<<<<< Updated upstream
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProblemPopUp from "./ProblemPopUp";
||||||| Stash base
'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import ProblemPopUp from './ProblemPopUp';
=======
"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import ProblemPopUp from './ProblemPopUp';
import getProblem from '@/libs/getProblem';
>>>>>>> Stashed changes

interface Props {
  id: string;
  problem: string;
  description: string;
  status: string;
}

export default function ProblemItem({ id, problem, description ,status}: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
<<<<<<< Updated upstream
    <div className="relative">
      {" "}
      {/* Container with relative positioning */}
      <div
        className="absolute top-0 right-0 mt-2 mr-2 bg-white text-black px-2 py-1 rounded"
        style={{ border: "1px solid black" }}
      >
        In Progress
      </div>{" "}
      {/* Status indicator */}
||||||| Stash base
    <div className="relative"> {/* Container with relative positioning */}
      <div className="absolute top-0 right-0 mt-2 mr-2 bg-white text-black px-2 py-1 rounded" style={{ border: '1px solid black' }}>
        In Progress
      </div> {/* Status indicator */}
=======
    <div className="relative"> {/* Container with relative positioning */}
      <div className="absolute top-0 right-0 mt-2 mr-2 bg-white text-black px-2 py-1 rounded" style={{ border: '1px solid black' }}>
          {status}
      </div> {/* Status indicator */}
>>>>>>> Stashed changes
      <div className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-10 w-full hover:scale-105 duration-300">
        <div className="h-full flex flex-col justify-start w-full space-y-[7px] mx-10">
          <div className="flex justify-between">
            <h2 className="lg:text-2xl md:text-xl sm:text-md text-md font-semibold">
              {problem}
            </h2>
          </div>
          <div className="">
            {description && (
              <div className="hidden sm:block break-words">
                <p className="text-wrap break-words">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
