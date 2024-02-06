'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const CreateEventForm = () => {
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [eventName,setEventName] = useState("");
    const [eventDescription,setEventDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleSubmit = () => {
        setShowModal(true);
    }

    const uploadImage = () => {

    }

    return (
        <div className={`${styles.Roboto} w-full h-full pt-[5%] pl-[5%] pr-[10%] text-black`}>
            <form onSubmit={handleSubmit} action="" className="w-full h-full">
                
                {/* Form */}
                <div className="flex flex-row flex-wrap justify-between h-[80%] w-full">

                    {/* Left Form */}
                    <div className="w-[60%] h-[90%] space-y-[10%]">
                        <div className="w-full h-[13%] relative">
                            <input className="border-[1px] border-gray-300 w-[60%] indent-4 h-full text-[18px]
                            rounded-md"
                            type="text" placeholder="Event Name" 
                            value={eventName} onChange={(e) => setEventName(e.target.value)}/>

                            {eventName.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Event Name
                                </div>
                            )}
                        </div>

                        <div className="w-full h-[13%] relative">
                            <input className="border-[1px] border-gray-300 w-[60%] indent-4 h-full text-[18px]
                            rounded-md relative"
                            type="text" placeholder="Date Start/End"/>
                            <span className="absolute inset-y-0 left-72 flex items-center pl-3 text-[60px]">
                                <CalendarMonthOutlinedIcon className="text-gray-500 hover:text-black cursor-pointer" />
                            </span>

                            {eventName.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Date Start/End
                                </div>
                            )}
                        </div>

                        <div className="w-full h-[45%] relative">
                            <textarea className="border-[1px] border-gray-300 w-full indent-4 h-full text-[18px]
                            rounded-md py-[10px]"
                            placeholder="Event Description"
                            value={eventDescription} onChange={(e)=>setEventDescription(e.target.value)}/>

                            {eventDescription.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Event Description
                                </div>
                            )}
                        </div> 
                    </div>

                    {/* Right Form */}
                    <div className="h-[90%] w-[30%] border-[1px] border-gray-300 rounded-md flex justify-center items-center">
                        <div className="text-center text-gray-400 hover:text-black  cursor-pointer"
                            onClick={uploadImage}>
                            <PhotoSizeSelectActualIcon className=""/>
                            <div className="">
                                Add Picture
                            </div>
                        </div>
                    </div>

                </div>

                {/* Button */}
                <div className="w-full flex flex-row flex-wrap justify-around">
                    <div className="w-[30%]">
                        <button className="bg-red-500 py-[17px] px-[100px] rounded-full text-white"
                        onClick={() => router.push("/homepage")}>
                            Cancel
                        </button>
                    </div>
                    
                    <div className="w-[30%]">
                        <button type="submit" className="bg-blue-400 py-[17px] px-[110px] rounded-full text-white">
                            Done
                        </button>
                    </div>
                </div>
                <SuccessModal topic="Evented Created" isVisible={showModal} onClose={()=>setShowModal(false)}/>
            </form>
        </div>
    )
}

export default CreateEventForm;