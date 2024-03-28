'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import SuccessModal from "./SuccessModal";
import { FormControl, InputLabel, MenuItem, Select, useMediaQuery } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";

interface Props {
    Id:string
    Name:string,
    Activity:string,
    StartDate:string,
    EndDate:string,
    Price:number,
    Location:string,
    District:string,
    Province:string,
    Description:string,
    ImgSrc:string
}

const EditEventForm = ({Id,Name,Activity,StartDate,EndDate,Price,Location,District,Province,Description,ImgSrc} : Props) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [startDate,setStartDate] = useState<Dayjs | null>(dayjs(StartDate, "YYYY/MM/DD"));
    const [endDate,setEndDate] = useState<Dayjs | null>(dayjs(EndDate, "YYYY/MM/DD"));
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [name,setName] = useState(Name);
    const [activity,setActivity] = useState(Activity)
    const [price, setPrice] = useState(Price);
    const [location,setLocation] = useState(Location);
    const [district,setDistrict] = useState(District);
    const [province,setProvince] = useState(Province);
    const [description,setDescription] = useState(Description);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(ImgSrc);
    const fileInputRef = useRef(null);
    const [error,setError] = useState("");

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
            setShowModal(true);
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
                                        {isMobile ? ( 
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
                            
                                    <div className="cursor-pointer text-gray-500 border-gray-500 border-dashed border-[3px]  w-[120px] h-[120px] 
                                    hover:text-black hover:border-black flex flex-col items-center justify-center absolute" onClick={triggerFileInput}>
                                        <div className="w-fit">
                                            <EditIcon style={{ fontSize: "60px", color: "yelllow"}}/>
                                        </div>

                                        <div className="text-[15px]">
                                            Edit Image
                                        </div>
                                    </div>
                                </div>
                        </div> 
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
                        onClick={() => router.push("/profile")}>
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
                <SuccessModal topic="Save Changes" isVisible={showModal}/>
            </form>
        </div>
    )
}

export default EditEventForm;