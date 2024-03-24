'use client'
import styles from "@/styles/FontPage.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { HandleCreateProblem } from "./user/HandleCreateProblem";
import {
    Checkbox,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";


interface Props {
  
    isVisible: boolean
    onClose: Function
    
}

const ProblemPopUp = ({ isVisible, onClose }: Props) => {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(0);
    const [iconSize, setIconSize] = useState('100px');

    const updateSize = () => {``
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) { // For small devices
            setIconSize('40px');
        } else if (screenWidth >= 768 && screenWidth < 1024) { // For medium devices
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

    const handleSubmit = async () => {
        ;
        if (subject == "") {
            setError(1);
            return;
        } if (content == "") {
            setError(2);
            return;
        }
        setError(0);
        handleClose();
        await HandleCreateProblem(subject, content);
    }

    if (!isVisible) return null;

    return (
        <div className={`w-screen h-screen fixed inset-0 z-auto top-0 left-0 flex flex-row justify-center items-center bg-opacity-25 bg-black ${styles.Roboto}`}>
            <div className="lg:w-[1000px] lg:h-[450px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[5px] z-20 rounded-3xl">

                <div className="flex w-full justify-end pr-[10px]">
                    <div className="px-4 py-2 flex cursor-pointer items-center w-fit">
                        <CloseIcon className="cursor-pointer" onClick={handleClose} />
                    </div>
                </div>

                <div className="px-[25px]">
                    <div className="lg:text-[40px] md:text-[30px] sm:text-[30px] text-[20px] font-medium 
                    w-fit flex items-center rounded-3xl px-[20px] 
                    lg:py-[7px] md:py-[5px] sm:py-[3px] py-[3px] relative flex-row">
                        What’s happening?
                    </div>

                    <form action={handleSubmit}>

                        <div className="pl-8 mt-1">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Event"
                                    className="form-radio h-6 w-6"
                                    onChange={() => setSubject("Event")}
                                />
                                <span className="text-base text-black ml-2">Event problem</span>
                                <label className="ml-6 inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Payment problem"
                                        className="form-checkbox h-6 w-6"
                                        onChange={() => setSubject("Payment")}
                                    // style={{ accentColor: "#F2D22E" }}
                                    />
                                    <span className="text-base text-black ml-2">Payment problem</span>
                                </label>
                                <label className="ml-6 inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Other"
                                        className="form-checkbox h-6 w-6"
                                        onChange={() => setSubject("Others")}
                                    // style={{ accentColor: "#F2D22E" }}
                                    />
                                    <span className="text-base text-black ml-2">Other</span>
                                </label>
                            </label>
                        </div>

                        <div className="w-full relative md:mt-[20px] mt-[15px]">
                            <textarea className={`border-[1px] ${error == 2 ? "border-red-600" : "border-black"} w-full lg:py-[10px] md:py-[8px] py-[7px]
                                lg:h-[150px] md:h-[100px] sm:h-[70px] h-[70px] lg:indent-4 md:indent-4 indent-3
                                 lg:text-[15px] md:text-[13px] sm:text-[11px] text-[12px] rounded-2xl placeholder:text-black placeholder:font-light`}
                                placeholder="Problem detail"
                                value={content} onChange={(e) => setContent(e.target.value)} maxLength={150} />
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

export default ProblemPopUp;