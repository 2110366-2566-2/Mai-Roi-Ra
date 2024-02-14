"use server";
import React from "react";
import EventItem from "@/components/EventItem";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiBalloonBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import getProfile from "@/libs/getProfile";
import EditProfileButton from "@/components/EditProfileButton";
import { revalidateTag } from "next/cache";
import ProfileUserInformation from "@/components/ProfileUserInformation";

export default async function Profile() {
  const profile = await getProfile("cbcd5d88-821f-4e5e-b1f8-7846e778ef68");
  revalidateTag("profile");

  return (
    <div className="bg-white text-black h-full">
      <div className="lg:mr-24 border-r bg-white">
        <div className="bg-blue-500 w-full h-[200px] relative">
          <Image
            src="/img/navy_background_picture.png"
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
            <ProfileUserInformation
              firstNameProp={profile.first_name}
              lastNameProp={profile.last_name}
              addressProp={profile.address}
              districtProp={profile.district}
              provinceProp={profile.province}
              phoneNumberProp={profile.phone_number}
              emailProp={profile.email}
              birthDateProp={profile.birth_date}
              usernameProp={profile.username}
            ></ProfileUserInformation>
            <EditProfileButton></EditProfileButton>
          </div>
        </div>
        <div className="bg-white w-full h-[50px] flex justify-center items-center border-b">
          <div className="text-gray-800">My events</div>
        </div>
      </div>
    </div>
  );
}
