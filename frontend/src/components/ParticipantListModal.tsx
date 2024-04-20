"use client";
import { useState } from "react";
import Modal from "./Modal";
import GroupsIcon from "@mui/icons-material/Groups";
import ParticipantProfileModal from "./ParticipantProfileModal";
import ParticipantListItem from "./ParticipantListItem";

interface Participant {
  username: string;
  user_image: string;
  first_name: string;
  last_name: string;
  num_participant: number;
}

interface Props {
  participants: { participant_list: Participant[] };
  numParticipants: number;
}

export default function ParticipantListModal({ participants, numParticipants }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [clickedParticipant, setClikedParticipant] = useState<Participant | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleParticipantClick = (participant: Participant) => {
    setClikedParticipant(participant);
    openProfileModal();
  };

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      {clickedParticipant && (
        <ParticipantProfileModal
          profile={clickedParticipant}
          isProfileModalOpen={isProfileModalOpen}
          closeProfileModal={closeProfileModal}
        />
      )}
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        style="absolute right-0 mr-16 top-1/2 transform -translate-y-1/2 w-[400px] h-[450px]"
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
          {participants.participant_list.map((item) => (
            <ParticipantListItem
              key={item.username}
              participant={item}
              onClick={handleParticipantClick}
            />
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