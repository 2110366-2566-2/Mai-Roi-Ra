import Image from "next/image";
import ProfileUserInformation from './ProfileUserInformation';
import Modal from './Modal';
import { useState, useEffect } from "react";
import getProfile from "@/libs/getProfile";

export default function ParticipantProfileModal({ profile, isProfileModalOpen, closeProfileModal}: { profile: any, isProfileModalOpen:boolean, closeProfileModal:Function }) {
    // const [profile, setProfile] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // console.log("here")
    // console.log(user_id);
    // useEffect(() => {
    //     console.log("mounted")
    //     const fetchProfile = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await getProfile(user_id);

    //             // Handle the response and update the state or perform any other necessary actions
    //             setProfile(response);
    //         } catch (error) {
    //             // Handle the error
    //             console.log("error is")
    //             console.error("Error fetching profile:", error.message);
    //         }
    //     };

    //     fetchProfile();

    //     return () => (
    //         console.log("unmounted")
    //     )
    // }, [user_id]);

    return (
        <Modal isOpen={isProfileModalOpen}
                closeModal={closeProfileModal as () => void}
                modalsize='!p-0'
                MarginTop='!mt-0'
                isNotRound={true}>
                <div>
                <button onClick={closeProfileModal} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 z-50">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="bg-blue-500 w-full h-[150px] relative">
                    <Image
                        src="/img/navy_background_picture.png"
                        alt="Background Image"
                        layout="fill"
                        objectFit="cover"
                        className="absolute"
                    />
                </div>

                <div className="relative bg-white w-full h-[300px]">
                    <div className="absolute top-[-50px] px-2 left-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-4 border-white">
                            <Image
                                src="/img/profile_picture.png"
                                alt="Profile Image"
                                width={96}
                                height={96}
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <ProfileUserInformation
                            firstNameProp={profile?.first_name}
                            lastNameProp={profile?.last_name}
                            addressProp={profile?.address}
                            districtProp={profile?.district}
                            provinceProp={profile?.province}
                            phoneNumberProp={profile?.phone_number}
                            emailProp={profile?.email}
                            birthDateProp={profile?.birth_date}
                            usernameProp={profile?.username}
                        ></ProfileUserInformation>

                    </div>
                    
                </div>
                </div>
        </Modal>

    );
}
