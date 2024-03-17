'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSession } from "next-auth/react";

const CreateProblemForm = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [description,setDescription] = useState("");
    const [activity, setActivity] = useState(""); 


    return (
        <div className={`${styles.Roboto} w-full text-black`}>
            <form className="w-full h-full">
                {/* Form */}

                <div className="w-full relative md:mt-[25px] mt-[20px]">
                            <textarea className="border-[1px] border-gray-300 w-full lg:py-[15px] md:py-[13px] py-[11px]  h-[240px] lg:indent-4 md:indent-4 indent-3
                             lg:text-[17px] md:text-[15px] text-[13px]
                            rounded-md"
                            placeholder="Problem Detail"
                            value={description} onChange={(e)=>setDescription(e.target.value)}/>

                            {description.length != 0 && (
                                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                                    Problem Detail
                                </div>
                            )}
                </div> 

                
                {/* Button */}
                <div className={`w-full flex flex-row flex-wrap justify-around mt-[25px]} lg:mb-[0px] mb-[30px]`}>
                    
                    <div className="">
                        <button type="submit" className="bg-[#F2D22E] lg:py-[17px] md:py-[14px] py-[11px] lg:px-[90px] md:px-[70px] px-[40px] 
                        lg:text-[17px] md:text-[13px] text-[10px] rounded-full">
                            Done
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateProblemForm;