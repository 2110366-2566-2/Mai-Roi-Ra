'use client'
import Image from "next/image";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

interface Props {
    isVisible:boolean
    onClose:Function
    username:string;
    email:string|null;
    phone_number:string|null;
    user_image:string;
}

const MenuPopup = ({isVisible,onClose,username,email,phone_number,user_image} : Props) => {
    const session = useSession();
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
                bg-opacity-25 bg-black text-black z-40">
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
                                  src={user_image? user_image : "/img/profile_picture.png"}
                                  alt="Filed To Load Image"
                                  width={300}
                                  height={300}/>
                             </div>
     
                             <div className="md:text-[30px] text-[15px] mt-[10px]">
                                {username}
                             </div>
     
                            {  email && 
                                <div className="text-gray-400 md:text-[15px] text-[12px]">
                                 {email} 
                                </div>
                            }

                            {  phone_number && 
                                <div className="text-gray-400 md:text-[15px] text-[12px]">
                                 {phone_number} 
                                </div>
                            }
                             
                         </div>
     
                         <div>
                             <div className="space-y-2 md:text-[20px] text-[15px]">
                                 <hr/>
                                 <div className={`px-4 py-2 flex cursor-pointer items-center w-full hover:bg-gray-200
                                    ${pathname === "/homepage" ? "text-[#FFAE27]" : ""}`}
                                    onClick={() => {router.push("/homepage"); handlerClose;}}>
                                     <HomeIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Home
                                 </div>
                                 <hr/>
                                 <div className={`px-4 py-2 cursor-pointer flex items-center w-full hover:bg-gray-200
                                    ${pathname === "/profile" ? "text-[#FFAE27]" : ""}`}
                                    onClick={() => {router.push("/profile"); handlerClose;}}>
                                    <PersonIcon className='md:mr-6 mr-3 md:text-[30px] text-[20px]'/>Profile
                                 </div>
                                 <hr/>
                                 <div
                                    className={`px-4 py-2 cursor-pointer flex items-center w-full hover:bg-gray-200 ${
                                        pathname === "/supportandservice" ? "text-[#FFAE27]" : ""}`}
                                        onClick={() => router.push("/supportandservice")}
                                    >
                                    <SupportAgentIcon className="md:mr-6 mr-3 md:text-[30px] text-[20px]" />
                                    Support and Service
                                </div>
                                <hr/>
                                <div
                                    className={`px-4 py-2 cursor-pointer flex items-center w-full hover:bg-gray-200
                                    ${pathname === "/review" ? "text-[#FFAE27]" : ""}`}
                                    onClick={() => router.push("/review")}>
                                    <RateReviewIcon className="pt-1 md:mr-6 mr-3 md:text-[30px] text-[20px]" />
                                    Review
                                </div>

                                 <hr/>
                             </div>
                         </div>
                     </div>
     
                    <div className="p-4 flex justify-center">
                        <button
                        className="text-white rounded-full hover:bg-yellow-500 bg-[#F2D22E] h-[40px] max-h-[150px] w-[70%]"
                        onClick={() => {
                            session
                            ? router.push("/auth/signout")
                            : router.push("/auth/signin");
                        }}
                        >
                        {session ? <>Log out</> : <>Sign in</>}
                        </button>
                    </div>
                 </div>
             </div> : null
           }
        </div>
    )
}

export default MenuPopup;