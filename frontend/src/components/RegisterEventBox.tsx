"use client"
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import LocationIcon from '@mui/icons-material/Place';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import AddGuestIcon from '@mui/icons-material/GroupAdd';
import { useState } from 'react';

interface Event {
    participant_fee: number;
    location_name: string;
    district:string;
    city:string;
    start_date: string;
    end_date: string;
}

export default function RegisterEventBox({event}:{event : Event}) {
    const [numberOfGuest, setNumberOfGuest] = useState(1);

    const handleMinusGuestButton = () => {
        if(numberOfGuest == 1){
            ;
        }else{
            setNumberOfGuest(numberOfGuest-1);
        }
    }

    return(
        <div className="flex mb-2 border rounded-lg p-4 flex flex-col w-full max-w-[400px] h-auto shadow-xl">
                        <div>
                            <span className="text-2xl font-semibold">{event.participant_fee} ฿</span>
                            <div className="w-full border rounded-lg flex flex-col h-auto mt-4">
                                <div className="w-full h-auto border flex flex-col p-4">
                                    <span className="w-full font-semibold flex items-center mb-4"><LocationIcon className="mr-2"/>Location</span>
                                    <label>{event.location_name + ", " + event.district + ", " + event.city}</label>
                                </div>
                                <div className="w-full h-auto border flex flex-col p-4">
                                    <span className="w-full font-semibold flex items-center mb-4"><CalendarIcon className="mr-2"/>Date</span>
                                    <label>{event.start_date + " - " + event.end_date}</label>
                                </div>
                                <div className="w-full h-[50px] border flex items-center justify-between p-4">
                                    <span className="font-semibold flex items-center"><AddGuestIcon className="mr-2"/>Guest</span>
                                    <div className="">
                                        <button className="h-full mx-2" onClick={()=>{
                                            handleMinusGuestButton();
                                        }}><MinusIcon className={"text-slate-300 " + `${numberOfGuest == 1 ? "": "hover:text-black "}`}/></button>
                                        <label className="mx-3">{numberOfGuest}</label>
                                        <button className="h-full mx-2" onClick={()=>{
                                            setNumberOfGuest(numberOfGuest+1);
                                        }}><PlusIcon className="text-slate-300 hover:text-black"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between my-4">
                                <label className="px-1">Total fee {1} person</label>
                                <label className="px-1">{event.participant_fee} $</label>
                            </div>
                        </div>
                        <button className="rounded-lg text-center w-full h-full bg-[#F2D22E] p-4">
                            Register
                        </button>
                    </div>
    );
};