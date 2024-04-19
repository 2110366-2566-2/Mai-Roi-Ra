import Image from "next/image";
import ProfileUserInformation from './ProfileUserInformation';
import Modal from './Modal';
import { useState, useEffect } from "react";
import getProfile from "@/libs/getProfile";

export default function ParticipantProfileModal({ profile, isProfileModalOpen, closeProfileModal}: { profile: any, isProfileModalOpen:boolean, closeProfileModal:() => void }) {

    return (
        <Modal isOpen={isProfileModalOpen}
                closeModal={closeProfileModal}
                modalsize='!p-0'
                MarginTop='!mt-0'
                isNotRound={true}
                allowOuterclose={null}
                canScroll={null}
                title={null}
                footerContent={null}
                style={null}
                >
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
                                src={ profile?.user_image || "/img/profile_picture.png"}
                                alt="Profile Image"
                                width={96}
                                height={96}
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <ProfileUserInformation
                            firstNameProp={profile?.first_name || "First Name"}
                            lastNameProp={profile?.last_name || "Last Name"}
                            addressProp={profile?.address || "Address"}
                            districtProp={profile?.district || "District"}
                            provinceProp={profile?.province || "Province"}
                            phoneNumberProp={profile?.phone_number || "Phone Number"}
                            emailProp={profile?.email || "Email"}
                            birthDateProp={profile?.birth_date || "Birth Date"}
                            usernameProp={profile?.username || "Username"}
                            user_id={null}
                            emailIsVerified={false}
                        ></ProfileUserInformation>

                    </div>
                    
                </div>
                </div>
        </Modal>

    );
}
