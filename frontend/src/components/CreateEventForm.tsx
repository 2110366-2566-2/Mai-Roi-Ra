'use client'
import styles from "@/styles/FontPage.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

const CreateEventForm = () => {
    const router = useRouter();
    const [showModal,setShowModal] = useState(true);

    const handleSubmit = () => {
        setShowModal(true);
    }

    return (
        <div className={`${styles.Roboto} w-full h-full pt-[5%] px-[5%]`}>
            <form onSubmit={handleSubmit} action="" className="w-full h-full">
                
                {/* Form */}
                <div className="flex flex-row flex-wrap justify-between h-[80%] w-full">

                    {/* Left Form */}
                    <div className="w-[40%] space-y-[10%]">
                        <div className="w-full h-[13%]">
                            <input className="border-[1px] border-gray-300 w-[60%] indent-4 h-full text-[18px]
                            rounded-md"
                            type="text" placeholder="Event Name" required/>
                        </div>

                        <div className="w-full h-[13%]">
                            <input className="border-[1px] border-gray-300 w-[60%] indent-4 h-full text-[18px]
                            rounded-md"
                            type="text" placeholder="Date Start/End" required/>
                        </div>

                        <div className="w-full h-[45%]">
                            <textarea className="border-[1px] border-gray-300 w-full indent-4 h-full text-[18px]
                            rounded-md py-[10px]"
                            placeholder="Event Description" required/>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div>
                        <input type="file"/>
                    </div>

                </div>

                {/* Button */}
                <div className="w-full flex flex-row flex-wrap justify-around">
                    <div className="w-[30%]">
                        <button className="bg-red-500 py-[17px] px-[100px] rounded-full text-white"
                        onClick={() => router.push("/homepage")}>
                            Cancel
                        </button>
                    </div>
                    
                    <div className="w-[30%]">
                        <button type="submit" className="bg-blue-400 py-[17px] px-[110px] rounded-full text-white">
                            Done
                        </button>
                    </div>
                </div>
                <SuccessModal topic="Evented Created" isVisible={showModal} onClose={()=>setShowModal(false)}/>
            </form>
        </div>
    )
}

export default CreateEventForm;