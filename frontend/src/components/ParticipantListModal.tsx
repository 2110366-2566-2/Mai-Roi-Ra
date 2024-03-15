"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import GroupsIcon from "@mui/icons-material/Groups";
import ParticipantProfileModal from "./ParticipantProfileModal";
import getProfile from "@/libs/getProfile";

export default function ParticipantListModal({
  participants,
  numParticipants,
}: {
  participants: any;
  numParticipants: any;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [clickedParticipant, setClikedParticipant] = useState("");
  const [profile, setProfile] = useState({});
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  console.log(participants);

  useEffect(() => {
    console.log("mounted");
    const fetchProfile = async () => {
      try {
        const response = await getProfile(clickedParticipant);

        // Handle the response and update the state or perform any other necessary actions
        setProfile(response);
        console.log(profile, "kuay");
      } catch (error) {
        // Handle the error
        console.log("error is");
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();

    return () => console.log("unmounted");
  }, [clickedParticipant]);
  console.log(clickedParticipant, "c");

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <ParticipantProfileModal
        profile={clickedParticipant}
        isProfileModalOpen={isProfileModalOpen}
        closeProfileModal={closeProfileModal}
      />
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        style={
          "absolute right-0 mr-16 top-1/2 transform -translate-y-1/2 w-[400px] h-[450px]"
        }
        isNotRound={true}
        modalsize="w-[400px] h-[450px] !px-0"
        canScroll={true}
        title={null}
        MarginTop=""
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="">
          {participants.participant_list.map((item: any) => (
            <div
              key={item.username}
              className="flex items-center space-x-4 border-b border-gray-200 justify-between py-4 hover:bg-gray-200 px-4"
              onClick={() => {
                setIsProfileModalOpen(true);
                setClikedParticipant(item);
              }}
            >
              <div className="flex items-center w-full">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={item.user_image}
                  alt={`${item.first_name} ${item.last_name}`}
                />
                <div className="flex flex-col ml-3">
                  {" "}
                  {/* Added flex-col class */}
                  <p className="font-bold text-sm">{item.username}</p>
                  <p className="text-sm text-gray-500">
                    {item.first_name} {item.last_name}
                  </p>
                </div>
              </div>
              <div className="ml-auto flex items-center">
                {" "}
                {/* Added flex class */}
                <GroupsIcon className="mr-4" />
                <span>{item.num_participant}</span>{" "}
                {/* Wrap item.num_participant with span for consistent spacing */}
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <div>
        <GroupsIcon className="text-3xl mr-4" />
        {numParticipants}
      </div>
      <button
        className="bg-[#F2D22E] hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded my-3"
        onClick={openModal}
      >
        Participants
      </button>
    </div>
  );
}
