"use client"
import React from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useState } from 'react';
import MenuPopup from './MenuPopup';
import { useRouter } from 'next/navigation';

interface Props {
  onDevice : String
}

export default function MenuBar({onDevice} : Props) {
  const pathname = usePathname(); 
  const [onVisible,setOnVisible] = useState(false);
  const router = useRouter();
  console.log(pathname)

  return (
    <div>
    {
      onDevice == "PC" ? 
        <div className="fixed left-0 top-0 h-screen text-black lg:w-[20%] w-[0%] bg-white border-r-[1px] border-gray-300 flex flex-col justify-between">
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
              <div className={`px-4 py-2 flex cursor-pointer items-center w-fit
                            ${pathname === "/homepage" ? "text-[#FFAE27]" : ""}`}
                            onClick={() => {router.push("/homepage");}}>
                                <HomeIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Home
                            </div>
                            <div className={`px-4 py-2 flex items-center w-fit`}>
                                <NotificationsIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Notifications
                            </div>
                            <div className={`px-4 py-2 cursor-pointer flex items-center w-fit
                              ${pathname === "/profile" ? "text-[#FFAE27]" : ""}`}
                            onClick={() => {router.push("/profile");}}>
                                <PersonIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Profile
                            </div>
                            <div className={`px-4 py-2 flex items-center w-fit`}>
                                <SupportAgentIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Support and Service
                            </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <button className="text-white rounded-full hover:bg-[#F2D57E] bg-[#FFAE27] h-[40px] max-h-[150px] w-[70%]">
              Logout
            </button>
          </div>
      </div> : 
        (!onVisible) ?  
        <div className="md:w-[50px] md:h-[50px] h-[25px] w-[25px] md:mt-[20px] mt-[10px] ml-[20px] cursor-pointer">
          <Image className="w-fit h-fit cursor-pointer"
            src="/img/menu.png"
            alt="Failed To Load Image"
            width={1000}
            height={1000}
            onClick={()=>{setOnVisible(true)}}/>
        </div> : <MenuPopup onPath={1} onVisible={onVisible} onClose={()=>setOnVisible(false)}/>
    }
    </div>
  );
};
