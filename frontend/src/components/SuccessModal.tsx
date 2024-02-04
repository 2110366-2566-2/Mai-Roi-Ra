'use client'
import styles from "@/styles/FontPage.module.css"
import Image from "next/image"

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
            <div className="w-[694px] h-[427px] bg-white pt-[20px] px-[15px]">

                <div className="w-full flex flex-row flex-wrap justify-end cursor-pointer">
                    <Image className="w-[69px] h-[63px]"
                    onClick={handlerClose}
                        src="/img/cancel.png"
                        alt="Failed To Load Image"
                        width={1000}
                        height={1000}/>
                </div>

                <div className={`${styles.Roboto} w-full text-center text-[40px]`}>
                        {topic}
                </div>

                <div className="w-full flex justify-center mt-[20px]">
                    <Image className="w-[222px] h-[189px]"
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