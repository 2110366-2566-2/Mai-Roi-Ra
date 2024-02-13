'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { HandleCreateEvent } from "./organizer/HandleCreateEvent";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CreateEventForm = () => {
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [name,setName] = useState("");
    const [activity, setActivity] = useState("");
    const [dateRange,setDateRange] = useState("");
    const [price, setPrice] = useState(null);
    const [error,setError] = useState("");
    const [location,setLocation] = useState("");
    const [district,setDistrict] = useState("");
    const [province,setProvince] = useState("");
    const [description,setDescription] = useState("");
    const [imageSrc,setImageSrc] = useState("");

    const handleSubmit = async () => {
        try {
            if (name == "") {
                setError("Event Name Required ! ");
                return;
            } if (activity == ""){
                setError("Activity Required")
            } if (dateRange == "") {
                setError("Date Range Required");
                return
            } if (imageSrc == "") {
                setError("Image Source Required");
                return;
            } if (price == null) {
                setError("Price Required");
                return;
            } if (location == ""){
                setError("Location Required");
                return;
            } if (district == ""){
                setError("District Required");
                return;
            } if (province == "" ){
                setError("Province Required");
                return;
            } if (imageSrc == "") {
                setError("Image Source Required");
                return;
            } if (!imageSrc.includes("https://drive.google.com") && !imageSrc.includes("https://images.unsplash.com")) {
                setError("Invalid Picture URI");
                return;
            } await HandleCreateEvent(name, activity, dateRange, price? price : 0, location, district, province, description, imageSrc);
        } catch (err) {
            setError("Create Failed. Please check the constraint");
            console.log(err)
        }
    }

    return (
        <div className={`${styles.Roboto} w-full text-black`}>
            <form action={handleSubmit} className="w-full h-full">
                {/* Form */}
                <div className="lg:flex lg:flex-row lg:flex-wrap lg:justify-between w-full">

                    {/* Left Form */}
                    <div className="lg:w-[48%] w-full md:space-y-[25px] space-y-[20px]">
                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" placeholder="Event Name"
                                value={name} onChange={(e) => setName(e.target.value)} maxLength={20}/>
                                {/* <span className="absolute inset-y-0 left-72 flex items-center pl-3 text-[60px]">
                                    <CalendarMonthOutlinedIcon className="text-gray-500 hover:text-black cursor-pointer" />
                                </span> */}

                                {name.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Event Name
                                    </div>
                                )}
                            </div>

                            <div className="w-[48%] relative">
                                <FormControl className="w-full lg:h-[52px] md:h-[45px] h-[40px]">
                                    <InputLabel>Activity</InputLabel>
                                    <Select value={activity} className={`border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full 
                                    lg:text-[17px] md:text-[15px] text-[13px] rounded-md`}
                                            label="Activity" onChange={(e) => setActivity(e.target.value)} >
                                        <MenuItem value="Entertainmeny">Entertainent</MenuItem>
                                        <MenuItem value="Exercise">Exercise</MenuItem>
                                        <MenuItem value="Volunteer">Volunteen</MenuItem>
                                        <MenuItem value="Meditation">Meditation</MenuItem>
                                        <MenuItem value="Cooking">Cooking</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
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

                                {price != null && (
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
                            value={location} onChange={(e) => setLocation(e.target.value)} maxLength={50}/>

                            {location.length != 0 && (
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
                                value={district} onChange={(e) => setDistrict(e.target.value)} maxLength={20}/>
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
                                value={province} onChange={(e) => setProvince(e.target.value)} maxLength={20}/>
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
                    <div className="lg:h-auto md:h-[300px] sm:h-[200px] h-[200px] lg:w-[47%] w-[full] lg:mt-[0] md:mt-[25px] mt-[20px] border-[1px]
                     border-gray-300 rounded-md flex justify-center items-center relative">
                        <textarea className="text-black w-full h-full indent-4 pt-[15px] px-[15px]"
                        placeholder="Add Picture" value={imageSrc} onChange={(e)=>setImageSrc(e.target.value)}/>
                         {imageSrc.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Image Src
                                </div>
                            )}
                    </div>

                </div>

                <div className="w-full relative md:mt-[25px] mt-[20px]">
                            <textarea className="border-[1px] border-gray-300 w-full lg:py-[15px] md:py-[13px] py-[11px]  h-[240px] lg:indent-4 md:indent-4 indent-3
                             lg:text-[17px] md:text-[15px] text-[13px]
                            rounded-md"
                            placeholder="Event Description"
                            value={description} onChange={(e)=>setDescription(e.target.value)}/>

                            {description.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Event Description
                                </div>
                            )}
                </div> 

                {
                    error != "" ? 
                    <div className="w-full text-red-600 text-center text-[25px] mt-[10px]">
                        {error}
                    </div>: null
                }

                {/* Button */}
                <div className={`w-full flex flex-row flex-wrap justify-around mt-[25px] ${error? "lg:mb-[30px]" : ""} lg:mb-[0px] mb-[30px]`}>
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