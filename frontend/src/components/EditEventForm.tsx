'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SuccessModal from "./SuccessModal";
import { FormControl, InputLabel, MenuItem, Select, useMediaQuery } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import { HandleUpdateEvent } from "./organizer/HandleUpdateEvent";
import LoadingCircular from "./LoadingCircular";
import updateEventImage from "@/libs/updateEventImage";
import { useSession } from "next-auth/react";

interface Props {
    Id:string,
    Name:string,
    Activity:string,
    StartDate:string,
    EndDate:string,
    Price:number,
    Location:string,
    District:string,
    Province:string,
    Description:string,
    ImgSrc:string,
    Status: string
}

const EditEventForm = ({Id,Name,Activity,StartDate,EndDate,Price,Location,District,Province,Description,ImgSrc,Status} : Props) => {
    const session = useSession();
    const user = session.data?.user;
    if (!user) return null;
    console.log(user);
    const isMobile = useMediaQuery('(max-width:768px)');

    const [loading,setLoading] = useState(false);
    const startDate = dayjs(StartDate.substring(0,4) + '/' + StartDate.substring(4,6) + '/' + StartDate.substring(6,8),  "YYYY/MM/DD");
    const endDate = dayjs(EndDate.substring(0,4) + '/' + EndDate.substring(4,6) + '/' + EndDate.substring(6,8), "YYYY/MM/DD");
    const router = useRouter();
    const [showModal,setShowModal] = useState(false);
    const [name,setName] = useState(Name);
    const [location,setLocation] = useState(Location);
    const [district,setDistrict] = useState(District);
    const [province,setProvince] = useState(Province);
    const [description,setDescription] = useState(Description);
    const [selectedImage, setSelectedImage] = useState<File|null>(null);
    const [preview, setPreview] = useState<string>(ImgSrc);
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    

    useEffect(() => {
        const updateImage = async() => {
            if (selectedImage) {
                const formData = new FormData();
                formData.append('event_id', Id); 
                formData.append('event_image', selectedImage);
                console.log(formData);
                await updateEventImage(Id,formData,user.token);
            } 
        }

        const updateInformation = async () => {
            const startTmp = dayjs(startDate);
            const endTmp = dayjs(endDate);

            await HandleUpdateEvent(
                Id,
                name,
                Activity,
                startTmp.format('YYYY/MM/DD'),
                endTmp.format('YYYY/MM/DD'),
                Price,
                location,
                district,
                province,
                description,
                Status,
                user.token
            );
        }

        const updateEvent = async () => {
            if (loading) {
                updateImage();
                updateInformation();

                setShowModal(true);
                setLoading(false);
            }
        };
        updateEvent();
    }, [loading]);

    const handleSubmit = async () => {
        try {
            if (name == "") {
                setError("Event Name Required!");
                return;
            } if (location == ""){
                return;
            } if (district == ""){
                setError("District Required");
                return;
            } if (province == "" ){
                setError("Province Required");
                return;
            } 
            setLoading(true);
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
                                <FormControl className="w-full lg:h-[52px] md:h-[45px] h-[40px] relative focus:outline-none">
                                    <InputLabel className="text-[16px] lg:mt-[-2px] md:mt-[-4px] sm:mt-[-6px] mt-[-8px] focus:outline-none">Activity</InputLabel>
                                    <Select value={Activity} className={`border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] h-full w-full 
                                    lg:text-[17px] md:text-[15px] text-[13px] rounded-md focus:outline-none`} readOnly>
                                        <MenuItem value="Entertainment" className="focus:outline-none">Entertainment</MenuItem>
                                        <MenuItem value="Exercise" className="focus:outline-none">Exercise</MenuItem>
                                        <MenuItem value="Volunteer" className="focus:outline-none">Volunteen</MenuItem>
                                        <MenuItem value="Meditation" className="focus:outline-none">Meditation</MenuItem>
                                        <MenuItem value="Cooking" className="focus:outline-none">Cooking</MenuItem>
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
                                                className="w-full"
                                                slotProps={{ textField: { size: 'small' } }}
                                                readOnly
                                            />
                                        ) : (
                                            <DatePicker
                                                label="Start Date"
                                                value={startDate}
                                                className="w-full"
                                                slotProps={{ textField: { size: 'medium' } }}
                                                readOnly
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
                                                className="w-full"
                                                slotProps={{ textField: { size: 'small' } }}
                                                readOnly
                                            />
                                        ) : (
                                            <DatePicker
                                                label="End Date"
                                                value={endDate}
                                                className="w-full"
                                                slotProps={{ textField: { size: 'medium' } }}
                                                readOnly
                                            />
                                        )}
                                    </LocalizationProvider>
                            </div>
                        </div>

                        <div className="flex flex-start flex-wrap justify-between w-full">
                            <div className="w-[48%] relative">
                                <input className="border-[1px] border-gray-300 lg:py-[15px] md:py-[13px] py-[11px] 
                                h-full w-full lg:indent-4 md:indent-4 indent-3 lg:text-[17px] md:text-[15px] text-[13px] rounded-md"
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
                                rounded-md focus:outline-none"
                                type="number" placeholder="Price"
                                value={Price} min={0} step={10} readOnly/>

                                {Price != null && (
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
                        <div className="w-full h-full ">
                                <Image className="h-full w-full absolute top-0 left-0 opacity-60" width={1000} height={1000} src={preview} alt="Preview"
                                onClick={triggerFileInput}/>
                            
                                <div className="w-full h-full overflow-hidden flex flex-row justify-center items-center">
                                    <input
                                        type="file"
                                        name="event_image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                </div>
                        </div> 
                                                    
                        <div className="absolute top-[-10px] right-[-10px] rounded-xl cursor-pointer border-black border-[1px] bg-white text-gray-500 md:w-[45px] md:h-[45px]
                            w-[30px] h-[30px] hover:text-black hover:border-black flex flex-row justify-center items-center" onClick={triggerFileInput}>
                                <EditIcon className="md:text-[30px] text-[20px]"/>
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
                <SuccessModal topic="Save Changes" isVisible={showModal} id={Id}/>
            </form>
            {loading &&
                <div className={`w-screen z-30 h-screen fixed inset-0 top-0 left-0 flex flex-row justify-center items-center bg-opacity-25 bg-black ${styles.Roboto}`}>
                    <LoadingCircular></LoadingCircular>
                </div>
            }
        </div>
    )
}

export default EditEventForm;
