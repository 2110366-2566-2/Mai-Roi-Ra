"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import updateEnableNotification from "@/libs/updateEnableNotification";
import LoadingCircular from "./LoadingCircular";

interface Props {
  isEnableNotificationProp: boolean;
  userIDProp: string;
  token: string;
}

export default function EditProfileButton({
  isEnableNotificationProp,
  userIDProp,
  token,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(isEnableNotificationProp);

  const [error, setError] = useState<string>("");

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    try {
      await updateEnableNotification(userIDProp, token);
      setError("");
    } catch (err) {
      setError("Update enable notification error. Server Failed ?");
      console.log("Err: ", err);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
        {isLoading && (
          <div className="flex justify-center items-center fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50">
            <LoadingCircular></LoadingCircular>
          </div>
        )}
      </div>
      <div className="text-blue-500 absolute bottom-2 right-0 m-10">
        <div className="inline-flex items-center">
          <IoIosNotificationsOutline className="text-gray-800 text-xl mr-1" />
          <span className="text-gray-800 text-sm mr-2">Notification</span>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
