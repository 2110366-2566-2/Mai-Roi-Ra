"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function EditProfileButton() {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/editprofile");
  };

  return (
    <div className="w-full">
      <div className="absolute top-0 right-0 m-4">
        <button
          className="text-sm bg-white hover:bg-gray-100 py-2 px-4 rounded-full border border-gray-300"
          onClick={handleClick}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
