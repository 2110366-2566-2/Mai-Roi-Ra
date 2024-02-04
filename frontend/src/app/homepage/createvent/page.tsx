import styles from "@/styles/FontPage.module.css"
import CreateEventForm from "@/components/CreateEventForm";

const CreateEvent = () => {
    return (
        <div className="w-[87%] h-screen border-r-[1px] border-gray-300">
            
            {/* Topic */}
            <div className={`${styles.Roboto} w-full flex flex-row flex-wrap justify-between h-[20%] 
            border-b-[1px] border-gray-300 py-[2%] pr-[3%] pl-[5%]`}>
                
                <div className="text-[85px] font-black h-fit w-fit mt-[20px]">
                    Create Event
                </div>
                
                <div className="rounded-md w-fit bg-teal-200 h-fit p-[10px] shadow-gray-400 shadow-md">
                    Organizer Mode
                </div>

            </div>

            {/* Form */}
            <div className="w-full h-[80%]">
                <CreateEventForm/>
            </div>

        </div>
    )
}

export default CreateEvent;