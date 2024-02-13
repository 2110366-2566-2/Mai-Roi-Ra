'use client'
import styles from "@/styles/FontPage.module.css"
import Image from "next/image"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Icon } from "@mui/material";

interface Props {
    topic:String
    isVisible:boolean
    onClose:Function
}

const SuccessModal = ({topic,isVisible,onClose} : Props) => {
    if (!isVisible) return null;
    
    const handlerClose = () => {
        onClose();
    }

    return (
        <div className="w-screen h-screen fixed inset-0 flex flex-row justify-center items-center 
        bg-opacity-25 bg-black">
            <div className="lg:w-[694px] lg:h-[427px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[20px] px-[15px] z-20">
                <div className="text-end">
                    <CancelOutlinedIcon className="icon-large cursor-pointer" onClick={handlerClose}/>
                </div>


                <div className={`${styles.Roboto} w-full text-center lg:text-[40px] md:text-[30px] text-[25px]`}>
                        {topic}
                </div>

                <div className="w-full flex justify-center mt-[40px]">
                    <Image className="lg:w-[250px] lg:h-[220px] md:w-[222px] md:h-[189px] w-[180px] h-[150px]"
                    src="/img/true.png"
                    alt="Failed To Load Image"
                    width={1000}
                    height={1000}/>
                </div>

            </div>
        </div>
    )
}

export default SuccessModal;