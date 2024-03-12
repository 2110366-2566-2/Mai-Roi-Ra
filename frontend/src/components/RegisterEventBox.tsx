"use client";
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import LocationIcon from '@mui/icons-material/Place';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import AddGuestIcon from '@mui/icons-material/GroupAdd';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import participateEvent from "@/libs/participateEvent";
import Modal from './Modal';

interface Event {
    activities: string;
    admin_id: string;
    city: string;
    country: string;
    deadline: string;
    description: string;
    district: string;
    end_date: string;
    event_id: string;
    event_image: string;
    event_name: string;
    location_id: string;
    location_name: string;
    organizer_id: string;
    participant_fee: 0;
    start_date: string;
    status: string;
}

export default function RegisterEventBox({ event }: { event: Event }) {
    const { data: session } = useSession();
    console.log(session)

    const handleRegisterEventButton = async () => {
        try {
            // Call the userRegister function to register the user for the event
            console.log(event.event_id, numberOfGuest, session?.user?.user_id);
            const registrationResult = await participateEvent(event.event_id, numberOfGuest, session?.user?.user_id);
            // Handle successful registration
            console.log("Registration successful:", registrationResult);
        } catch (error: any) {
            // Handle registration error
            console.error("Registration failed:", error.message);
        }
    };

    const [numberOfGuest, setNumberOfGuest] = useState(1);

    const startyear = event.start_date.substring(0, 4);
    const startmonth = event.start_date.substring(4, 6);
    const startday = event.start_date.substring(6, 8);

    const startdateObj = new Date(`${startyear}-${startmonth}-${startday}`);
    const formattedStartDate = startdateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const endyear = event.end_date.substring(0, 4);
    const endmonth = event.end_date.substring(4, 6);
    const endday = event.end_date.substring(6, 8);

    const enddateObj = new Date(`${endyear}-${endmonth}-${endday}`);
    const formattedEndDate = enddateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const handleMinusGuestButton = () => {
        if (numberOfGuest == 1) {
            return;
        } else {
            setNumberOfGuest(numberOfGuest - 1);
        }
    };

    const currentDate = new Date();
    const enddateCompare = new Date(event.end_date);
    const isRegistrationClosed = currentDate > enddateCompare;

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} closeModal={closeModal} title="Are you sure to register to this event?">
                <p>The Registeration cannot be cancel in the future.</p>
                <div className='w-full flex justify-between'>
                    <button
                        onClick={()=>{closeModal()}}
                        className="mt-4 py-2 px-4 text-white rounded-md bg-gray-300 w-[82px]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={()=>{
                            closeModal();
                            handleRegisterEventButton();
                        }}
                        className="mt-4 py-2 px-4 text-white rounded-md bg-[#F2D22E] w-[82px]"
                    >
                        Yes
                    </button>
                </div>
            </Modal>
            <div className="flex mb-2 border rounded-lg p-4 flex flex-col w-full max-w-[400px] h-auto shadow-xl">
                <div>
                    <span className="text-2xl font-semibold">{event.participant_fee} ฿</span>
                    <div className="w-full border rounded-lg flex flex-col h-auto mt-4">
                        <div className="w-full h-auto border flex flex-col p-4">
                            <span className="w-full font-semibold flex items-center mb-4"><LocationIcon className="mr-2"/>Location</span>
                            <label>{`${event.location_name}, ${event.district}, ${event.city}, ${event.country}`}</label>
                        </div>
                        <div className="w-full h-auto border flex flex-col p-4">
                            <span className="w-full font-semibold flex items-center mb-4"><CalendarIcon className="mr-2"/>Date</span>
                            <label>{formattedStartDate + " - " + formattedEndDate}</label>
                        </div>
                        <div className="w-full h-[50px] border flex items-center justify-between p-4">
                            <span className="font-semibold flex items-center"><AddGuestIcon className="mr-2"/>Guest</span>
                            <div className="">
                                <button className="h-full mx-2" onClick={() => { handleMinusGuestButton(); }}>
                                    <MinusIcon className={"text-slate-300 " + `${numberOfGuest == 1 ? "" : "hover:text-black "}`}/>
                                </button>
                                <label className="mx-3">{numberOfGuest}</label>
                                <button className="h-full mx-2" onClick={() => { setNumberOfGuest(numberOfGuest + 1); }}>
                                    <PlusIcon className="text-slate-300 hover:text-black"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between my-4">
                        <label className="px-1">Total fee {numberOfGuest} person</label>
                        <label className="px-1">{event.participant_fee * numberOfGuest} ฿</label>
                    </div>
                </div>
                {session && !session.user.organizer_id && !isRegistrationClosed ? (
                    <button className="rounded-lg text-center w-full h-full bg-[#F2D22E] p-4" onClick={() => { setIsModalOpen(true);window.location.reload(); }}>
                        Register
                    </button>
                ) : (
                    <button className="rounded-lg text-center w-full h-full bg-gray-300 text-white p-4 cursor-not-allowed">
                        {session ? 
                            (session.user.organizer_id ? 
                                'You are organizer. Only user can register'
                                : 
                                (isRegistrationClosed ?
                                    'The Event has passed' 
                                    : 
                                    null
                                )
                            )
                            :
                            'Please Sign in first'
                        }
                    </button>
                )}
            </div>
        </>
    );
}
