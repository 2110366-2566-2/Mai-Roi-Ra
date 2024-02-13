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
        <div className="w-screen h-screen fixed inset-0 flex flex-row justify-center items-center 
        bg-opacity-25 bg-black z-20">
            <div className="lg:w-[694px] lg:h-[427px] md:w-[500px] md:h-[350px] w-[350px] h-[300px] bg-white pt-[20px] px-[15px] z-20">

                <div className={`${styles.Roboto} w-full text-center mt-[10px] lg:text-[40px] md:text-[30px] text-[25px]`}>
                        Delete this event
                </div>

                <div className="w-full flex justify-center lg:mt-[20px] md:mt-[15px] sm:mt-[15px] mt-[20px]">
                    <Image className="lg:w-[250px] lg:h-[220px] md:w-[222px] md:h-[189px] w-[150px] h-[130px]"
                    src="/img/bin.png"
                    alt="Failed To Load Image"
                    width={1000}
                    height={1000}/>
                </div>

                <div className="w-full flex flex-row justify-around mt-[20px]">
                    <div className="">
                        <button className="bg-[#D9D5D2] md:py-[14px] py-[11px] lg:px-[70px] md:px-[70px] px-[40px] 
                        lg:text-[17px] md:text-[17px] text-[10px] rounded-xl" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                    
                    <div className="">
                        <button type="submit" className="bg-[#F2D22E] md:py-[14px] py-[11px] lg:px-[70px] md:px-[70px] px-[40px] 
                        lg:text-[17px] md:text-[17px] text-[10px] rounded-xl" onClick={handleSubmit}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePopUp;