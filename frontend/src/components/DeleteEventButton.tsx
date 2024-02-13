'use client'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { HandleDeleteEvent } from './organizer/HandleDeleteEvent';

interface Props {
    id: string
}

export default function DeleteEventButton({id} : Props) {

    const handleDelete = async () => {
        try {
            await HandleDeleteEvent(id);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button className="bg-[#F2D57E] hover:bg-[#F2D22E] rounded-md h-fit px-[10px] lg:py-[10px] md:py-[8px] 
            py-[5px] lg:text-[17px] md:text-[13px] text-[10px]" onClick={handleDelete}>
                <span>
                    <DeleteForeverIcon className="lg:text-[40px] md:text-[35px] text-[30px]"/>
                </span> Delete Event
            </button>
        </div>
    )
}

