// "use client";
import React from "react";
import EventItem from "@/components/EventItem";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiBalloonBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import getProfile from "@/libs/getProfile";
import EditProfileButton from "@/components/EditProfileButton";

export default async function Profile() {
  const profile = await getProfile("550e8400-e29b-41d4-a716-446655440100");
  console.log(profile);

  return (
    <div className="bg-white text-black h-full">
      <div className="lg:mr-24 border-r bg-white">
        <div className="bg-blue-500 w-full h-[200px] relative">
          <Image
            src="/img/background_picture.jpeg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="absolute"
          />
        </div>

        <div className="relative bg-white w-full h-[200px]">
          <div className="absolute top-[-50px] px-2 left-8">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
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
            <div className="w-full">
              <div className="flex mt-14">
                <div className="text-xl ml-8">{profile.first_name}</div>
                <div className="text-xl ml-2">{profile.last_name}</div>
              </div>
              <div className="ml-10">
                <div className="text-sm text-gray-500">@{profile.username}</div>
              </div>
              <div className="mt-2 ml-16 space-y-2">
                {1 ? (
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 text-sm mr-1" />
                    <div className="text-sm text-gray-500">
                      {profile.phone_number}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MdEmail className="text-gray-500 text-sm mr-1" />
                    <div className="text-sm text-gray-500">{profile.email}</div>
                  </div>
                )}
                <div className="flex items-center">
                  <PiBalloonBold className="text-gray-500 text-sm mr-1" />
                  <div className="text-sm text-gray-500">
                    Born {profile.birth_date}
                  </div>
                </div>

                <div className="flex items-center">
                  <SlLocationPin className="text-gray-500 text-sm mr-1" />
                  <div className="text-sm text-gray-500">
                    {profile.province}
                  </div>
                </div>
              </div>
            </div>
            <EditProfileButton></EditProfileButton>
          </div>
        </div>
        <div className="bg-white w-full h-[50px] flex justify-center items-center border-b">
          <div className="text-gray-800">My events</div>
        </div>
        {/* <div className="bg-white w-full h-[800px] px-10">
          {mockdata.map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
