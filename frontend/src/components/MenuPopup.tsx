'use client'
import { useState } from "react";
import Image from "next/image";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    onPath:number
    onVisible:boolean
    onClose:Function
}

const MenuPopup = ({onPath,onVisible,onClose} : Props) => {
    const [onShowMenu,setShowMenu] = useState(onVisible);
    if (!onShowMenu) return null;

    const handleClose = () => {
        onClose();
    }

    return (
        <div className="w-screen h-screen fixed inset-0 flex flex-row justify-center items-center 
        bg-opacity-25 bg-black text-black">
            <div className="fixed left-0 top-0 h-screen w-[300px] bg-white border-r-[1px] border-gray-300 flex flex-col justify-between">
  
                <div className='flex flex-col pt-4 pl-4'>
                    <div className="h-fit">
                        <Image className="w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer"
                                src="/img/cancel.png"
                                alt="Failed To Load Image"
                                width={1000}
                                height={1000}
                                onClick={handleClose}/>
                    </div>

                    <div className="p-4">
                        <Image className="w-[60px] h-[60px]"
                            src="/img/icon_sunlight.png"
                            alt="Failed To Load Image"
                            width={60}
                            height={60}/>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                    <div className="space-y-2">
                        <div className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center `}><HomeIcon className='mr-3'/>Home</div>
                        <div className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center`}><NotificationsIcon className='mr-3'/>Notifications</div>
                        <div className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center`}><PersonIcon className='mr-3'/>Profile</div>
                    </div>
                    </div>
                </div>

                <div className="p-4 flex justify-center">
                    <button className="text-white rounded-full hover:bg-blue-600 bg-[#1EA1F1] h-[40px] w-[150px]">
                    Logout
                    </button>
                </div>

        </div>
      </div>
    )
}

export default MenuPopup;