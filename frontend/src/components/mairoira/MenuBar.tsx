"use client"
import React from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';


export default function MenuBar() {
  const pathname = usePathname();
  
  console.log(pathname)

  return (
    <div className="fixed left-0 top-0 h-screen w-[20%] bg-white border border-slate-200 flex flex-col justify-between">
      <div className='flex flex-col pt-4 pl-4'>
        <div className="p-4">
          <Image className="w-[60px] h-[60px]"
            src="/img/icon_sunlight.png"
            alt="Failed To Load Image"
            width={60}
            height={60}/>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-2">
            <div className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center ${pathname === "/homepage" ? 'text-[#FFAE27]' : 'text-black'}`}><HomeIcon className='mr-3'/>Home</div>
            <div className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center ${pathname === "/homepage/ex" ? 'text-[#FFAE27]' : 'text-black'}`}><NotificationsIcon className='mr-3'/>Notifications</div>
            <div className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center ${pathname === "/profile" ? 'text-[#FFAE27]' : 'text-black'}`}><PersonIcon className='mr-3'/>Profile</div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <button className="text-white rounded-full hover:bg-blue-600 bg-[#1EA1F1] h-[40px] w-[150px]">
          Logout
        </button>
      </div>
    </div>
  );
};