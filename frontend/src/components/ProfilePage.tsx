"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";

export default function ProfilePage() {
  const [username, setUsername] = useState("wish-eq");
  const [firstName, setFirstName] = useState("Wish");
  const [lastName, setLastName] = useState("Marukapitak");
  const [address, setAddress] = useState("315/150 Chamchuri Square");
  const [district, setDistrict] = useState("Payathai");
  const [province, setProvince] = useState("Bangkok");
  const [phoneNumber, setPhoneNumber] = useState("0968800127");
  const [email, setEmail] = useState("wish.eq@gmail.com");
  const [birthDate, setBirthDate] = useState("1 Nov 2003");
  const [profilePicture, setProfilePicture] = useState("");
  const [backgroundPicture, setBackgroundPicture] = useState("");

  return (
    <div className="bg-white text-black h-full">
      <div className="lg:mr-24 border-r bg-purple-500">
        <div className="bg-blue-500 w-full h-[200px] relative">
          <Image
            src="/img/background_picture.png" // Replace with your image path
            alt="Background Image"
            layout="fill"
            objectFit="cover" // 'cover' will ensure the image covers the entire area
            className="absolute" // Position absolute to fit within the parent div
          />
        </div>

        <div className="relative bg-white w-full h-[400px]">
          <div className="absolute top-[-50px] px-2 left-8">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/img/profile_picture.png" // Replace with your image path
                alt="Profile Image"
                width={96} // Adjust the size as needed
                height={96} // Ensure width and height are the same for a circle
                objectFit="cover" // This ensures the image covers the circle area
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-full">
              <div className="flex mt-14">
                <div className="text-xl ml-8">{firstName}</div>
                <div className="text-xl ml-2">{lastName}</div>
              </div>
              <div className="ml-10">
                <div className="text-sm text-gray-500">@{username}</div>
              </div>
              <div className="mt-2 ml-16 space-y-2">
                {phoneNumber ? (
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 text-sm mr-1" />
                    <div className="text-sm text-gray-500">{phoneNumber}</div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 text-sm mr-1" />
                    <div className="text-sm text-gray-500">{email}</div>
                  </div>
                )}
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 text-sm mr-1" />
                  <div className="text-sm text-gray-500">Born {birthDate}</div>
                </div>

                <div className="flex items-center">
                  <FaPhone className="text-gray-500 text-sm mr-1" />
                  <div className="text-sm text-gray-500">{province}</div>
                </div>
              </div>
            </div>
            <div className="w-full">set profile</div>
          </div>
        </div>
        <div className="bg-yellow-500 w-full h-[50px] flex justify-center items-center">
          <div className="text-gray-800">My events</div>
        </div>
        <div className="bg-green-500 w-full h-[800px]"></div>
      </div>
    </div>
  );
}
