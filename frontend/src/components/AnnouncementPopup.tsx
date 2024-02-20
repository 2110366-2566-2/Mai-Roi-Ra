'use client'
import styles from "@/styles/FontPage.module.css"
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { HandleCreateAnnouncement } from "./organizer/HandleCreateAnnouncement";

interface Props {
    id:string
    name:string
    isVisible:boolean
    onClose:Function
}

const AnnouncementPopup = ({id,name,isVisible,onClose} : Props) => {
    const [subject,setSubject] = useState("");
    const [content,setContent] = useState("");
    const [error,setError] = useState("");
    if (!isVisible) return null;
    
    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async () => {
        if (subject == "") {
            setError("Header require");
            return;
        } if (content == ""){
            setError("Content require");
            return;
        }
        await HandleCreateAnnouncement(id,name,subject,content);
        onClose();
    }

    return ( 
        <div className={`w-screen h-screen absolute top-0 left-0 flex flex-row justify-center items-center bg-opacity-25 bg-black z-20 ${styles.Roboto}`}>
            <div className="lg:w-[1000px] lg:h-[450px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[20px] z-20 rounded-3xl"> 

                <div className="flex w-full justify-end pr-[10px]">
                    <CloseIcon className="text-[60px] cursor-pointer" onClick={handleClose}/>
                </div>

                <div className="px-[25px]">
                    <div className="text-[40px] bg-[#F2D22E] w-fit flex items-center rounded-3xl px-[20px] py-[7px]">
                        <CampaignIcon className="text-[100px] mr-[15px]"/>Announcement
                    </div>

                    <form action={handleSubmit}>
                        <div className="w-[50%] relative md:mt-[20px] mt-[15px]">
                            <input className="border-[1px] border-black lg:py-[10px] md:py-[8px] py-[7px] h-full w-full lg:indent-4 md:indent-4 indent-3 
                            lg:text-[20px] md:text-[17px] text-[15px] rounded-xl placeholder:text-black"
                                type="text" placeholder="Header"
                                value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={30}/>

                            {/* {province.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Province
                                </div>
                            )} */}
                        </div>

                        <div className="w-full relative md:mt-[20px] mt-[15px]">
                            <textarea className="border-[1px] border-black w-full lg:py-[10px] md:py-[8px] py-[7px] h-[150px] lg:indent-4 md:indent-4 indent-3
                                 lg:text-[20px] md:text-[17px] text-[15px] rounded-2xl"
                                    placeholder="Type a message to all partcipants in this event"
                                    value={content} onChange={(e)=>setContent(e.target.value)} maxLength={150}/>

                                    {/* {message.length != 0 && (
                                        <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                            Message
                                        </div>
                                    )} */}
                        </div> 
                    </form>
                    {
                        error != "" && 
                        <div className="w-full flex flex-row justify-center">
                            {error}
                        </div>
                    }
                    <div className="flex justify-end items-center md:mt-[15px] mt-[12px]">
                        <button type="submit" className="bg-[#F2D22E] w-[15%] rounded-full text-[20px] py-[5px]">
                            Done
                        </button>
                    </div>
                </div>
               
            </div>
        </div>

    )
}

export default AnnouncementPopup;