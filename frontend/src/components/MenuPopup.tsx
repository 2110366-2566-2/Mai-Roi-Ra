'use client'
import Image from "next/image";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
    isVisible:boolean
    onClose:Function
}

const MenuPopup = ({isVisible,onClose} : Props) => {
    const session = useSession();
    const user = session.data?.user;
    const pathname = usePathname(); 
    const router = useRouter();
    if (!isVisible) return null;

    const handlerClose = () => {
        onClose();
    }

    return (
        <div>
            { isVisible ?  
                <div className="w-screen h-screen fixed inset-0 flex flex-row justify-center items-center 
                bg-opacity-25 bg-black text-black z-10">
                 <div className="fixed left-0 top-0 h-screen w-[50%] bg-white border-r-[1px] border-gray-300 flex flex-col justify-between">
       
                     <div className='flex flex-col pt-4'>
                         <div className="h-fit">
                             <Image className="md:w-[20px] md:h-[20px] h-[15px] w-[15px] absolute top-2 right-2 cursor-pointer"
                                src="/img/cancel.png"
                                alt="Failed To Load Image"
                                width={1000}
                                height={1000}
                                onClick={handlerClose}/>
                         </div>
     
                         <div className="p-4 w-full flex justify-center">
                             <Image className="md:w-[60px] md:h-[60px] h-[30px] w-[30px]"
                                 src="/img/icon_sunlight.png"
                                 alt="Failed To Load Image"
                                 width={60}
                                 height={60}/>
                         </div>
     
                         <div className="px-5 mb-[30px]">
                             <div className="rounded-full w-fit h-fit">
                                 <Image className="md:w-[120px] md:h-[120px] w-[60px] h-[60px] rounded-full"
                                 src="/img/profile_picture.png"
                                 alt="Filed To Load Image"
                                 width={300}
                                 height={300}/>
                             </div>
     
                             <div className="md:text-[30px] text-[15px] mt-[10px]">
                                {
                                    session?
                                     user?.first_name:
                                     "Guest"
                                }
                             </div>
     
                             {
                                session?
                                    <div className="text-gray-400 md:text-[15px] text-[12px]">
                                     {
                                        user?.email == "" ? user.phone_number :
                                        user?.email
                                     } 
                                    </div>
                                    : 
                                    <div className="text-gray-400 md:text-[15px] text-[12px]">
                                        "Guest"
                                    </div>
                            }
                             
                         </div>
     
                         <div>
                             <div className="space-y-2 md:text-[20px] text-[15px]">
                                 <hr/>
                                 <div className={`px-4 py-2 flex cursor-pointer items-center w-fit
                                    ${pathname === "/homepage" ? "text-[#FFAE27]" : ""}`}
                                    onClick={() => {router.push("/homepage"); handlerClose;}}>
                                     <HomeIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Home
                                 </div>
                                 <hr/>
                                 <div className={`px-4 py-2 flex items-center w-fit`}>
                                     <NotificationsIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Notifications
                                 </div>
                                 <hr/>
                                 <div className={`px-4 py-2 cursor-pointer flex items-center w-fit
                                    ${pathname === "/profile" ? "text-[#FFAE27]" : ""}`}
                                    onClick={() => {router.push("/profile"); handlerClose;}}>
                                    <PersonIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Profile
                                 </div>
                                 <hr/>
                                 <div className={`px-4 py-2 flex items-center w-fit`}>
                                     <SupportAgentIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Support and Service
                                 </div>
                                 <hr/>
                             </div>
                         </div>
                     </div>
     
                     <div className="p-4 flex justify-center">
                         <button className="text-white rounded-full hover:bg-[#F2D57E] bg-[#FFAE27] h-[40px] md:w-[150px] w-[100px]">
                            Logout
                         </button>
                     </div>
                 </div>
             </div> : null
           }
        </div>
    )
}

export default MenuPopup;