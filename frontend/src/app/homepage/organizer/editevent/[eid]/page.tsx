import styles from "@/styles/FontPage.module.css"
import EditEventForm from "@/components/CreateEventForm";

interface Props {
    params : {eid:string}
}

const EditEvent = ({params}: Props) => {
    return (
        <div className='lg:pt-8 pt-2 px-10 text-black'>
            {/* Topic */}
            <h1 className='font-bold lg:text-5xl text-3xl lg:mb-[50px] md:mb-7 mb-5'>Edit Event</h1>

            {/* Form */}
            <div className="">
                <EditEventForm/>
            </div>

        </div>
    )
}

export default EditEvent;
export async function generateStaticParams(){
    return [{eid:"001"},{eid:"002"},{eid:"003"},{eid:"004"}]
}