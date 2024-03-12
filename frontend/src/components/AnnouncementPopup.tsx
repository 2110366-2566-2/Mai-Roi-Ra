'use client'
import styles from "@/styles/FontPage.module.css"
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useEffect } from "react";
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
    const [error,setError] = useState(0);
    const [iconSize, setIconSize] = useState('100px');

    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if(screenWidth < 768) { // For small devices
        setIconSize('40px');
      } else if(screenWidth >= 768 && screenWidth < 1024) { // For medium devices
        setIconSize('50px');
      } else { // For large devices and up
        setIconSize('70px');
      }
    };
  
    useEffect(() => {
      window.addEventListener('resize', updateSize);
      updateSize(); // Set initial size
  
      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleClose = () => {
        setError(0);
        setSubject("");
        setContent("");
        onClose();
    }

    const handleSubmit = async () => {;
        if (subject == "") {
            setError(1);
            return;
        } if (content == ""){
            setError(2);
            return;
        }
        setError(0);
        await HandleCreateAnnouncement(id,name,subject,content);
        handleClose();
    }

    if (!isVisible) return null;

    return ( 
        <div className={`w-screen h-screen fixed inset-0 z-auto top-0 left-0 flex flex-row justify-center items-center bg-opacity-25 bg-black ${styles.Roboto}`}>
            <div className="lg:w-[1000px] lg:h-[450px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[5px] z-20 rounded-3xl"> 

                <div className="flex w-full justify-end pr-[10px]">
                    <div className="px-4 py-2 flex cursor-pointer items-center w-fit">
                        <CloseIcon className="cursor-pointer" onClick={handleClose}/>
                    </div>
                </div>

                <div className="px-[25px]">
                    <div className="lg:text-[40px] md:text-[30px] sm:text-[30px] text-[20px] font-light bg-[#F2D22E] 
                    w-fit flex items-center rounded-3xl px-[20px] 
                    lg:py-[7px] md:py-[5px] sm:py-[3px] py-[3px] relative flex-row">
                        <CampaignIcon style={{ fontSize: iconSize }} className="lg:mr-[10px] md:mr-[8px] sm:mr-[6px] mr-[6px]"/> Announcement
                    </div>

                    <form action={handleSubmit}>
                        <div className="w-[50%] relative md:mt-[20px] mt-[15px]">
                            <input className={`border-[1px] ${error == 1 ? "border-red-600" : "border-black"} lg:py-[10px] md:py-[8px] py-[7px] h-full w-full lg:indent-4 md:indent-4 indent-3 
                            lg:text-[20px] md:text-[17px] sm:text-[12px] text-[12px] rounded-xl placeholder:text-black placeholder:font-light`}
                                type="text" placeholder="Header"
                                value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={30}/>

                            {/* {province.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Province
                                </div>
                            )} */}
                        </div>

                        <div className="w-full relative md:mt-[20px] mt-[15px]">
                            <textarea className={`border-[1px] ${error == 2 ? "border-red-600" : "border-black"} w-full lg:py-[10px] md:py-[8px] py-[7px]
                                lg:h-[150px] md:h-[100px] sm:h-[70px] h-[70px] lg:indent-4 md:indent-4 indent-3
                                 lg:text-[20px] md:text-[17px] sm:text-[12px] text-[12px] rounded-2xl placeholder:text-black placeholder:font-light`}
                                    placeholder="Type a message to all participants in this event"
                                    value={content} onChange={(e)=>setContent(e.target.value)} maxLength={150}/>

                                    {/* {message.length != 0 && (
                                        <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                            Message
                                        </div>
                                    )} */}
                        </div> 

                        <div className="flex justify-end items-center md:mt-[15px] mt-[12px]">
                            <button type="submit" className="bg-[#F2D22E] lg:w-[15%] md:w-[25%] sm:w-[30%] w-[30%] rounded-full lg:text-[20px] md:text-[15px] sm:text-[12px] text-[12px] py-[5px]">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
               
            </div>
        </div>

    )
}

export default AnnouncementPopup;