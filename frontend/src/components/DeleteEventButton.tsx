"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeletePopUp from "@/components/DeletePopUp";
import { useState } from "react";

interface Props {
  id: string;
}

export default function DeleteEventButton({ id }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setShowModal(true);
  };

  return (
    <div>
      <button
        className="bg-[#F2D57E] hover:bg-[#F2D22E] rounded-md h-fit px-[10px] lg:py-[10px] md:py-[8px] 
            py-[5px] lg:text-[17px] md:text-[13px] text-[10px]"
        onClick={handleDelete}
      >
        <span>
          <DeleteForeverIcon className="lg:text-[40px] md:text-[35px] text-[30px]" />
        </span>{" "}
        Delete Event
      </button>
      <DeletePopUp
        id={id}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
