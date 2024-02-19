'use client'
import styles from "@/styles/FontPage.module.css"
import Image from "next/image"
import { HandleDeleteEvent } from "@/components/organizer/HandleDeleteEvent";

interface Props {
    id:string
    isVisible:boolean
    onClose:Function
}

const DeletePopUp = ({id,isVisible,onClose} : Props) => {
    if (!isVisible) return null;
    
    const handleClose = async () => {
        onClose();
    }

    const handleSubmit = async () => {
        try {
            await HandleDeleteEvent(id);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-screen h-screen fixed inset-0 flex flex-row justify-center items-center bg-opacity-25 bg-black z-20">
<div className="lg:w-[694px] lg:h-[427px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[20px] px-[15px] z-20 flex flex-col">    
<div className={`${styles.Roboto} w-full text-center mt-3 lg:text-4xl md:text-3xl text-4xl`}>
        Delete this event
    </div>

    <div className="w-full flex justify-center lg:mt-20 md:mt-15 sm:mt-15 mt-20 h-full">
        <div className="lg:w-full lg:max-w-[250px] lg:h-full md:w-full md:max-w-[220px] md:h-auto w-auto h-auto flex items-center">
            <Image
                src="/img/bin.png"
                alt="Failed To Load Image"
                width={175}
                height={175}
            />
        </div>
    </div>
        
        <div className="w-full flex flex-row justify-around my-[10px] mb-5">
                <button className="bg-[#D9D5D2] md:py-[14px] py-[11px] lg:px-[70px] md:px-[70px] px-[40px] lg:text-[17px] md:text-[17px] text-[10px] rounded-xl" onClick={handleClose}>
                    Cancel
                </button>
                <button type="submit" className="bg-[#F2D22E] md:py-[14px] py-[11px] lg:px-[70px] md:px-[70px] px-[40px] lg:text-[17px] md:text-[17px] text-[10px] rounded-xl" onClick={handleSubmit}>
                    Confirm
                </button>
            </div>

</div>

</div>

    )
}

export default DeletePopUp;