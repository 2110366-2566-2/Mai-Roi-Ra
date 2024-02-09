'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const CreateEventForm = () => {
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [eventName,setEventName] = useState("");
    const [dateRange,setDateRange] = useState("");
    const [price, setPrice] = useState(null);
    const [locationName,setLocationName] = useState("");
    const [district,setDistrict] = useState("");
    const [province,setProvince] = useState("");
    const [eventDescription,setEventDescription] = useState("");

    const handleSubmit = () => {
        setShowModal(true);
    }

    const uploadImage = () => {

    }

    return (
        <div className={`${styles.Roboto} w-full text-black`}>
            <form onSubmit={handleSubmit} action="" className="w-full h-full">
                
                {/* Form */}
                <div className="lg:flex lg:flex-row lg:flex-wrap lg:justify-between w-full">

                    {/* Left Form */}
                    <div className="lg:w-[48%] w-full md:space-y-[25px] space-y-[20px]">
                        <div className="w-full relative">
                            <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-[48%] lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                            rounded-md"
                            type="text" placeholder="Event Name" 
                            value={eventName} onChange={(e) => setEventName(e.target.value)}/>

                            {eventName.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Event Name
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" placeholder="Date Start/End"
                                value={dateRange} onChange={(e) => setDateRange(e.target.value)}/>
                                {/* <span className="absolute inset-y-0 left-72 flex items-center pl-3 text-[60px]">
                                    <CalendarMonthOutlinedIcon className="text-gray-500 hover:text-black cursor-pointer" />
                                </span> */}

                                {dateRange.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Date Start/End
                                    </div>
                                )}
                            </div>

                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="number" placeholder="Price" min={0} step={10}
                                value={price} onChange={(e) => setPrice(e.target.value)}/>
                                {/* <span className="absolute inset-y-0 left-72 flex items-center pl-3 text-[60px]">
                                    <CalendarMonthOutlinedIcon className="text-gray-500 hover:text-black cursor-pointer" />
                                </span> */}

                                {price && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Price
                                    </div>
                                )} 
                            </div>
                        </div>

                        <div className="w-full relative"> 
                            <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-[48%] lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                            rounded-md"
                            type="text" placeholder="Location Name" 
                            value={locationName} onChange={(e) => setLocationName(e.target.value)}/>

                            {locationName.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Location Name
                                </div>
                            )}
                        </div>
                            
                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" placeholder="District"
                                value={district} onChange={(e) => setDistrict(e.target.value)}/>
                                {/* <span className="absolute inset-y-0 left-72 flex items-center pl-3 text-[60px]">
                                    <CalendarMonthOutlinedIcon className="text-gray-500 hover:text-black cursor-pointer" />
                                </span> */}

                                {district.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        District
                                    </div>
                                )}
                            </div>

                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" placeholder="Province"
                                value={province} onChange={(e) => setProvince(e.target.value)}/>
                                {/* <span className="absolute inset-y-0 left-72 flex items-center pl-3 text-[60px]">
                                    <CalendarMonthOutlinedIcon className="text-gray-500 hover:text-black cursor-pointer" />
                                </span> */}

                                {province.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Province
                                    </div>
                                )}
                            </div>
                        </div>

                        
                    </div>

                    {/* Right Form */}
                    <div className="lg:h-auto md:h-[300px] sm:h-[200px] h-[200px] lg:w-[47%] w-[full] lg:mt-[0] md:mt-[25px] mt-[20px] border-[1px] border-gray-300 rounded-md flex justify-center items-center">
                        <div className="text-center text-gray-400 hover:text-black  cursor-pointer"
                            onClick={uploadImage}>
                            <PhotoSizeSelectActualIcon className=""/>
                            <div className="">
                                Add Picture
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-full relative md:mt-[25px] mt-[20px]">
                            <textarea className="border-[1px] border-gray-300 w-full lg:py-[15px] md:py-[13px] py-[11px]  h-[240px] lg:indent-4 md:indent-4 indent-3
                             lg:text-[17px] md:text-[15px] text-[13px]
                            rounded-md"
                            placeholder="Event Description"
                            value={eventDescription} onChange={(e)=>setEventDescription(e.target.value)}/>

                            {eventDescription.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Event Description
                                </div>
                            )}
                </div> 

                {/* Button */}
                <div className="w-full flex flex-row flex-wrap justify-around mt-[25px] lg:mb-[0px] mb-[30px]">
                    <div className="">
                        <button className="bg-[#D9D5D2] lg:py-[17px] md:py-[14px] py-[11px] lg:px-[90px] md:px-[70px] px-[40px] lg:text-[17px] md:text-[13px] 
                        text-[10px] rounded-full"
                        onClick={() => router.push("/homepage/organizer")}>
                            Cancel
                        </button>
                    </div>
                    
                    <div className="">
                        <button type="submit" className="bg-[#F2D22E] lg:py-[17px] md:py-[14px] py-[11px] lg:px-[90px] md:px-[70px] px-[40px] 
                        lg:text-[17px] md:text-[13px] text-[10px] rounded-full">
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