import styles from "@/styles/FontPage.module.css"
import EditEventForm from "@/components/CreateEventForm";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
    params : {eid:string}
}

const EditEvent = ({params}: Props) => {
    return (
        <div className='lg:pt-8 pt-2 px-10 text-black'>
            {/* Topic */}
            <div className="flex flex-row justify-between">
                <h1 className='font-bold lg:text-5xl text-3xl lg:mb-[50px] md:mb-7 mb-5'>Edit Event</h1>
                <button className="bg-[#F2D57E] hover:bg-[#F2D22E] rounded-md h-fit px-[10px] lg:py-[10px] md:py-[8px] py-[5px] lg:text-[17px] md:text-[13px] text-[10px]">
                    <span>
                        <DeleteForeverIcon className="lg:text-[40px] md:text-[35px] text-[30px]"/>
                    </span> Delete Event
                </button>
            </div>


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