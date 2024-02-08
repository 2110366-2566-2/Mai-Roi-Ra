import styles from "@/styles/FontPage.module.css"
import CreateEventForm from "@/components/CreateEventForm";

const CreateEvent = () => {
    return (
        <div className="lg:w-[87%] w-screen lg:h-screen lg:border-r-[1px] border-gray-300 text-black">
            
            {/* Topic */}
            <div className={`${styles.Roboto} w-full flex flex-row flex-wrap justify-between h-[20%] 
            border-b-[1px] border-gray-300 py-[2%] pr-[5%] pl-[5%]`}>
                
                <div className="lg:text-[85px] md:text-[70px] sm:text-[60px]  text-[50px] font-black h-fit w-fit mt-[20px]">
                    Create Event
                </div>
                
                <div className="rounded-md w-fit bg-teal-200 h-fit p-[10px] shadow-gray-400 shadow-md">
                    Organizer Mode
                </div>

            </div>

            {/* Form */}
            <div className="w-full lg:h-[80%] flex flex-row justify-center">
                <CreateEventForm/>
            </div>

        </div>
    )
}

export default CreateEvent;