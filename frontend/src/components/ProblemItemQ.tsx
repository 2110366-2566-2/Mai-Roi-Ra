"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnnouncementPopup from "./AnnouncementPopup";

// interface Props {
//   id: string;
//   name: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   city: string;
//   district: string;
//   imgSrc: string;
//   page: number;
//   role: string;
// }

export default function ProblemItemQ() {
  return (
    <div className="text-black">
      <div className="flex items-center my-4 shadow-md lg:h-[200px] md:h-[160px] h-[120px] p-2 lg:p-5 w-full hover:scale-105 duration-300"></div>
    </div>
  );
}
