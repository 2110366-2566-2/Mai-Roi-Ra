'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

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
        <div className={`${styles.Roboto} w-full lg:h-full pt-[5%] pl-[5%] lg:pr-[10%] pr-[5%] text-black`}>
            <form onSubmit={handleSubmit} action="" className="w-full h-full">
                
                {/* Form */}
                <div className="lg:flex lg:flex-row lg:flex-wrap lg:justify-between lg:h-[80%] h-[400px] w-full">

                    {/* Left Form */}
                    <div className="lg:w-[60%] w-full h-[90%] space-y-[20px]">
                        <div className="w-full h-[13%] relative">
                            <input className="border-[1px] border-gray-300 lg:w-[48%] md:w-[48%] w-full indent-4 h-full text-[18px]
                            rounded-md"
                            type="text" placeholder="Event Name" 
                            value={eventName} onChange={(e) => setEventName(e.target.value)}/>

                            {eventName.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Event Name
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-start flex-wrap justify-between w-full lg:h-[13%] md:h-[13%] h-[30%]">
                            <div className="lg:w-[48%] md:w-[48%] w-full lg:h-full md:h-full h-[43%] relative">
                                <input className="border-[1px] border-gray-300 w-full indent-4 h-full text-[18px]
                                rounded-md relative"
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

                            <div className="lg:w-[48%] md:w-[48%] w-full lg:h-full md:h-full h-[43%] relative">
                                <input className="border-[1px] border-gray-300 w-full lg:mt-[0px] md:mt-[0px] indent-4 text-[18px] rounded-md relative h-full"
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

                        <div className="w-full h-[13%] relative"> 
                            <input className="border-[1px] border-gray-300 w-full indent-4 h-full text-[18px]
                            rounded-md"
                            type="text" placeholder="Location Name" 
                            value={locationName} onChange={(e) => setLocationName(e.target.value)}/>

                            {locationName.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Location Name
                                </div>
                            )}
                        </div>
                            
                        <div className="flex flex-start flex-wrap justify-between w-full lg:h-[13%] md:h-[13%] h-[30%]">
                            <div className="lg:w-[48%] md:w-[48%] w-full lg:h-full md:h-full h-[43%] relative">
                                <input className="border-[1px] border-gray-300 w-full indent-4 h-full text-[18px]
                                rounded-md relative"
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

                            <div className="lg:w-[48%] md:w-[48%] w-full lg:h-full md:h-full h-[43%] relative">
                                <input className="border-[1px] border-gray-300 w-full indent-4 h-full text-[18px]
                                rounded-md relative"
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

                        <div className="w-full h-[35%] relative">
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
                    <div className="h-[93%] lg:w-[30%] md:w-full lg:mt-[0] mt-[50px] border-[1px] border-gray-300 rounded-md flex justify-center items-center">
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