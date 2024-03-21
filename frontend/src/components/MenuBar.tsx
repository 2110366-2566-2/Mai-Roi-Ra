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
    <div className="fixed left-0 top-0 h-screen text-black lg:w-[20%] w-[0%] bg-slate-50 border-r-[1px]
       border-gray-300 flex flex-col justify-between">
        <div className='flex flex-col pt-4'>
          <div className="p-4 pl-8">
            <Image className="w-[60px] h-[60px]"
              src="/img/icon_sunlight.png"
              alt="Failed To Load Image"
              width={60}
              height={60}/>
          </div>

        <div className="flex-grow overflow-y-auto">
        <div className="space-y-2">
          <div className={`px-4 py-2 flex cursor-pointer items-center w-full hover:bg-gray-200 
            ${pathname === "/homepage" ? "text-[#FFAE27]" : ""}`}
              onClick={() => {router.push("/homepage");}}>
                <HomeIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Home
          </div>
        
          <div className={`px-4 py-2 flex items-center w-full hover:bg-gray-200`}>
            <NotificationsIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Notifications
          </div>
          {session ? 
            <div className={`px-4 py-2 cursor-pointer flex items-center w-full hover:bg-gray-200
              ${pathname === "/profile" ? "text-[#FFAE27]" : ""}`}
                onClick={() => {router.push("/profile");}}>
                <PersonIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Profile
            </div>
          : null }

          <div className={`px-4 py-2 flex items-center w-full hover:bg-gray-200`}>
            <SupportAgentIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Support and Service
          </div>

        </div>

        </div>
        </div>

        <div className="p-4 flex justify-center">
            <button className="text-white rounded-full hover:bg-[#F2D57E] bg-[#FFAE27] h-[40px] max-h-[150px] w-[70%]" 
              onClick={()=>{
                session ? router.push("/auth/signout") : router.push("/auth/signin")
                }}>
              {session ? <>Log out</> : <>Sign in</>}
            </button>
        </div>

    </div>
  );
};
