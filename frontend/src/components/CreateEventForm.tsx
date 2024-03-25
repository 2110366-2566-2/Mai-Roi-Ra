'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import SuccessModal from "./SuccessModal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from "next/image";
import BackupIcon from '@mui/icons-material/Backup';
import { HandleCreateEvent } from "./organizer/HandleCreateEvent";
import { useSession } from "next-auth/react";

const CreateEventForm = () => {
    const session = useSession()
    const user = session.data?.user;
    console.log(user);
    const isMobile = useMediaQuery('(max-width:768px)');
    
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [startDate,setStartDate] = useState<Dayjs | null>(null);
    const [endDate,setEndDate] = useState<Dayjs | null>(null);
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [name,setName] = useState("");
    const [activity, setActivity] = useState(""); 
    const [price, setPrice] = useState<number | null>(null);
    const [error,setError] = useState("");
    const [location,setLocation] = useState("");
    const [district,setDistrict] = useState("");
    const [province,setProvince] = useState("");
    const [description,setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    // const [sendForm,setSendForm] = useState(false);
    const fileInputRef = useRef(null);
    
    // useEffect(() => {
    //     const createEvent = async () => {
    //         if (sendForm && user) {
    //             try {
    //                 if (!selectedImage || !price) return;
    //                 const formData = new FormData();
    //                 formData.append('event_name', name);
    //                 formData.append('activities', activity);
    //                 formData.append('city', province);
    //                 formData.append('description', description);
    //                 formData.append('district', district);
    //                 formData.append('start_date', start);
    //                 formData.append('end_date', end);
    //                 formData.append('event_image', selectedImage);
    //                 formData.append('location_name', location);
    //                 formData.append('organizer_id', user.organizer_id);
    //                 formData.append('participant_fee', price.toString());
    //                 console.log(formData);
    //                 await HandleCreateEvent(formData,user.token);
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         } 
    //     }
    //     createEvent();
    // },[sendForm])

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setSelectedImage(file); 
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        try {
            if (name == "") {
                setError("Event Name Required ! ");
                return;
            } if (activity == ""){
                setError("Activity Required")
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
            } if (!selectedImage) {
                setError("Image Required");
                return;
            } 
            const currentDate = dayjs();
            const startTmp = dayjs(startDate);
            const endTmp = dayjs(endDate);
            if (startTmp.isBefore(currentDate) || endTmp.isBefore(currentDate)) {
                setError("Dates cannot be in the past.");
                return;
            }
    
            const differenceInDays = endTmp.diff(startTmp, 'day');
            if (differenceInDays < 0) {
                setError("End Date cannot before Start Date");
                return;
            }

            setStart(startTmp.format('YYYY/MM/DD'));
            setEnd(endTmp.format('YYYY/MM/DD'));
            
            if (user) {
                try {
                    if (!selectedImage || !price) return;
                    const formData = new FormData();
                    formData.append('event_name', name);
                    formData.append('activities', activity);
                    formData.append('city', province);
                    formData.append('description', description);
                    formData.append('district', district);
                    formData.append('start_date', start);
                    formData.append('end_date', end);
                    formData.append('event_image', selectedImage);
                    formData.append('location_name', location);
                    formData.append('organizer_id', user.organizer_id);
                    formData.append('participant_fee', price.toString());
                    console.log(formData);
                    await HandleCreateEvent(formData,user.token);
                } catch (err) {
                    console.log(err)
                }
            } 
            setShowModal(true);
        } catch (err) {
            setError("Create Failed. Please check the constraint");
            console.log(err)
        }
    }

    return (
        <div className={`${styles.Roboto} w-full text-black`}>
            <form action={handleSubmit} className="w-full h-full" encType="multipart/form-data">
                {/* Form */}
                <div className="lg:flex lg:flex-row lg:flex-wrap lg:justify-between w-full">

                    {/* Left Form */}
                    <div className="lg:w-[48%] w-full md:space-y-[25px] space-y-[20px]">
                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" name="event_name" placeholder="Event Name"
                                value={name} onChange={(e) => setName(e.target.value)} maxLength={20}/>

                                {name.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Event Name
                                    </div>
                                )}
                            </div>

                            <div className="w-[48%] relative">
                                <FormControl className="w-full lg:h-[52px] md:h-[45px] h-[40px] relative">
                                    <InputLabel className="text-[16px] lg:mt-[-2px] md:mt-[-4px] sm:mt-[-6px] mt-[-8px]">Activity</InputLabel>
                                    <Select value={activity} className={`border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full 
                                    lg:text-[17px] md:text-[15px] text-[13px] rounded-md`}
                                        onChange={(e) => setActivity(e.target.value)} >
                                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                                        <MenuItem value="Exercise">Exercise</MenuItem>
                                        <MenuItem value="Volunteer">Volunteer</MenuItem>
                                        <MenuItem value="Meditation">Meditation</MenuItem>
                                        <MenuItem value="Cooking">Cooking</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {isMobile ? ( // Check if the device is mobile
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e)}
                                            className="w-full"
                                            slotProps={{ textField: { size: 'small' } }}
                                        />
                                    ) : (
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e)}
                                            className="w-full"
                                            slotProps={{ textField: { size: 'medium' } }}
                                        />
                                    )}
                                </LocalizationProvider>
                            </div>

                            <div className="w-[48%] relative">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {isMobile ? ( // Check if the device is mobile
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e)}
                                            className="w-full"
                                            slotProps={{ textField: { size: 'small' } }}
                                        />
                                    ) : (
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e)}
                                            className="w-full"
                                            slotProps={{ textField: { size: 'medium' } }}
                                        />
                                    )}
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" name="location" placeholder="Location Name"
                                value={location} onChange={(e) => setLocation(e.target.value)} maxLength={20}/>

                                {location.length != 0 && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Location Name
                                    </div>
                                )}
                            </div>

                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="number" placeholder="Price"
                                value={price} onChange={(e) => setPrice(e.target.value)} min={0} step={10}/>

                                {price != null && (
                                    <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                        Price
                                    </div>
                                )} 
                            </div>
                        </div>
                            
                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px]
                                rounded-md"
                                type="text" placeholder="District"
                                value={district} onChange={(e) => setDistrict(e.target.value)} maxLength={20}/>

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
                     border-gray-300 rounded-md flex justify-center items-center relative border-dashed">

                       {preview ? 
                            <div className="w-full h-full relative">
                                <Image className="h-full w-full absolute top-0 left-0 opacity-60" width={1000} height={1000} src={preview} alt="Preview"
                                onClick={triggerFileInput}/>
                            
                                <div className="w-full h-full overflow-hidden flex flex-row justify-center items-center absolute">
                                    <input
                                        type="file"
                                        name="event_image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                            
                                    <div className="cursor-pointer text-gray-400 rounded-full w-[150px] h-[150px] bg-gray-200
                                    hover:text-black hover:border-black flex flex-col items-center justify-center absolute" onClick={triggerFileInput}>
                                        <div className="w-fit">
                                            <BackupIcon style={{ fontSize: "60px", color: "yelllow"}}/>
                                        </div>

                                        <div className="text-[15px]">
                                            Edit Image
                                        </div>
                                    </div>
                                </div>
                            </div> : 

                            <div className="w-full h-full">
                                <div className="w-full h-full overflow-hidden flex flex-row justify-center items-center">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />

                                    <div className="cursor-pointer text-gray-400 w-[150px] h-[150px]
                                    hover:text-black flex flex-col items-center justify-center"  onClick={triggerFileInput}>
                                        <BackupIcon style={{ fontSize: "60px" }}/>
                                        <div className="text-[15px]">
                                            Upload Image
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        }
                        
                        {/* <textarea className="text-black w-full h-full indent-4 pt-[15px] px-[15px] lg:text-[17px] md:text-[15px] text-[13px]"
                        placeholder="Add Picture" value={imageSrc} onChange={(e)=>setImageSrc(e.target.value)}/>
                         {imageSrc.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Image Src
                                </div>
                            )} */}
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
                <SuccessModal topic="Event Created" isVisible={showModal}/>
            </form>
        </div>
    )
}

export default CreateEventForm;