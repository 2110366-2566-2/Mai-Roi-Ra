'use client'
import styles from "@/styles/FontPage.module.css"
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

interface Props {
    id:string
    name:string
    isVisible:boolean
    onClose:Function
}

const AnnouncementPopup = ({id,name,isVisible,onClose} : Props) => {
    const [header,setHeader] = useState("");
    const [message,setMessage] = useState("");
    if (!isVisible) return null;
    
    const handleClose = async () => {
        onClose();
    }

    return ( 
        <div className={`w-screen h-screen fixed inset-0 flex flex-row justify-center items-center bg-opacity-25 bg-black z-20 ${styles.Roboto}`}>
            <div className="lg:w-[1000px] lg:h-[500px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[20px] z-20 rounded-3xl"> 

                <div className="flex w-full justify-end pr-[10px]">
                    <CloseIcon className="text-[60px]"/>
                </div>

                <div className="px-[25px]">
                    <div className="text-[40px] bg-[#F2D22E] w-fit flex items-center rounded-3xl px-[20px] py-[7px]">
                        <CampaignIcon className="text-[50px] mr-[15px]"/>Announcement
                    </div>

                    <div className="w-full relative md:mt-[20px] mt-[15px]">
                        <input className="border-[1px] border-black lg:py-[10px] md:py-[8px] py-[7px] h-full w-full lg:indent-4 md:indent-4 indent-3 
                        lg:text-[17px] md:text-[15px] text-[13px] rounded-full"
                            type="text" placeholder="Type your topic announcement"
                            value={header} onChange={(e) => setHeader(e.target.value)} maxLength={20}/>

                        {/* {province.length != 0 && (
                            <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                Province
                            </div>
                        )} */}
                    </div>

                    <div className="w-full relative md:mt-[20px] mt-[15px]">
                        <textarea className="border-[1px] border-black w-full lg:py-[15px] md:py-[13px] py-[11px] h-[150px] lg:indent-4 md:indent-4 indent-3
                            lg:text-[17px] md:text-[15px] text-[13px] rounded-2xl"
                                placeholder="Type a message to all partcipants in this event"
                                value={message} onChange={(e)=>setMessage(e.target.value)}/>

                                {/* {message.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Message
                                    </div>
                                )} */}
                    </div> 

                    <div className="flex justify-end items-center md:mt-[15px] mt-[12px]">
                        <button className="bg-[#F2D22E] w-[15%] rounded-full text-[20px] py-[5px]">
                            Done
                        </button>
                    </div>
                </div>
               
            </div>
        </div>

    )
}

export default AnnouncementPopup;