"use client";
import React from "react";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiBalloonBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

interface Props {
  firstNameProp: string;
  lastNameProp: string;
  addressProp: string;
  districtProp: string;
  provinceProp: string;
  phoneNumberProp: string;
  emailProp: string;
  birthDateProp: string;
  usernameProp: string;
}

export default function ProfileUserInformation({
  firstNameProp,
  lastNameProp,
  addressProp,
  districtProp,
  provinceProp,
  phoneNumberProp,
  emailProp,
  birthDateProp,
  usernameProp,
}: Props) {
  // USER FIELDS
  const [firstName, setFirstName] = useState(firstNameProp);
  const [lastName, setLastName] = useState(lastNameProp);
  const [address, setAddress] = useState(addressProp);
  const [district, setDistrict] = useState(districtProp);
  const [province, setProvince] = useState(provinceProp);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberProp);
  const [email, setEmail] = useState(emailProp);
  const [birthDate, setBirthDate] = useState(birthDateProp);
  const [profilePicture, setProfilePicture] = useState();
  const [backgroundPicture, setBackgroundPicture] = useState();

  const [username, setUsername] = useState(usernameProp);

  const reformatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Usage in your component
  const formattedDate = reformatDate(birthDate);

  return (
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
            <MdEmail className="text-gray-500 text-sm mr-1" />
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        )}
        <div className="flex items-center">
          <PiBalloonBold className="text-gray-500 text-sm mr-1" />
          <div className="text-sm text-gray-500">Born {formattedDate}</div>
        </div>

        <div className="flex items-center">
          <SlLocationPin className="text-gray-500 text-sm mr-1" />
          <div className="text-sm text-gray-500">{province}</div>
        </div>
      </div>
    </div>
  );
}
