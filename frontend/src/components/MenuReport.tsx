"use client"
import React from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';



export default function MenuBar() {
  const {data:session} = useSession()
  const pathname = usePathname(); 
  const router = useRouter();
  console.log(pathname)

  return (
    <div className="text-black bg-white border-r-[1px]
       border-gray-300 flex flex-row justify-start ">
          
          <div className={`px-10 py-5 flex cursor-pointer items-center font-base lg:text-3xl text-xl hover:bg-gray-200 
            ${pathname === "/homepage/reportproblem" ? "bg-amber-300" : ""}`}
              onClick={() => {router.push("/homepage/reportproblem");}}>
              FAQs
          </div>

          <div className={`px-10 py-5 flex cursor-pointer items-center font-base lg:text-3xl text-xl hover:bg-gray-200 
            ${pathname === "/homepage/reportproblem/Report" ? "bg-amber-300" : ""}`}
              onClick={() => {router.push("/homepage/reportproblem/Report");}}>
                Report
          </div>

    </div>
  );
};
