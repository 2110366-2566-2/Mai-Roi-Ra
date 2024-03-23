'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from 'react';
import SuccessModal from "./SuccessModal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from "next/image";

const CreateEventForm = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [startDate,setStartDate] = useState<Dayjs | null>(null);
    const [endDate,setEndDate] = useState<Dayjs | null>(null);
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [name,setName] = useState("");
    const [activity, setActivity] = useState(""); 
    const [price, setPrice] = useState(null);
    const [error,setError] = useState("");
    const [location,setLocation] = useState("");
    const [district,setDistrict] = useState("");
    const [province,setProvince] = useState("");
    const [description,setDescription] = useState("");
    const [imageSrc,setImageSrc] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
  
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
                                type="text" placeholder="Event Name"
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
                                        <MenuItem value="Volunteer">Volunteen</MenuItem>
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
                                type="text" placeholder="Location Name"
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
                     border-gray-300 rounded-md flex justify-center items-center relative">
                       {preview && (
                            <div className="w-full h-64 flex justify-center items-center">
                            <img src={preview} alt="Preview" className="max-h-full" />
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleFileChange}}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100"
                        />
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
                <SuccessModal id={""} name={name} activity={activity} startDate={start} endDate={end}
                price={price?price:0} location={location} 
                district={district} province={province} description={description} imageSrc={imageSrc}
                topic="Event Created" isVisible={showModal}/>
            </form>
        </div>
    )
}

export default CreateEventForm;