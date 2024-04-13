import CreateEventForm from "@/components/CreateEventForm";

const CreateEvent = () => {

    return (
        <div className='lg:pt-8 pt-2 px-10 text-black'>
            {/* Topic */}
            <h1 className='font-bold lg:text-5xl text-3xl lg:mb-[50px] md:mb-7 mb-5'>Create Event</h1>

            {/* Form */}
            <div className="">
                <CreateEventForm/>
            </div>

        </div>
    )
}

export default CreateEvent;