"use client";
import React from "react";
import { useState } from "react";
import EventItem from "@/components/EventItem";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiBalloonBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

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

  const mockdata = [
    {
      name: "Event Name",
      startDate: "21 Jan 2024",
      endDate: "23 Jan 2024",
      description:
        "ยืนรอรถเมล์ต้องควบคู่กับการซื้อหมูปิ้งข้างทาง พร้อมกลิ่นปะยางจากร้านมอไซต์ข้างๆชวนให้เกิดอารมณ์สุนทรีย์ พร้อมพลีกายเพื่อชาติบ้านเมือง",
      imgSrc:
        "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Birthday Party",
      startDate: "15 Feb 2024",
      endDate: "16 Feb 2024",
      description:
        "Celebrate John's birthday with friends and family at the park.",
      imgSrc:
        "https://images.unsplash.com/photo-1560173045-beaf11c65dce?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Team Building Workshop",
      startDate: "10 Mar 2024",
      endDate: "12 Mar 2024",
      description:
        "Join us for a team building workshop focused on communication and collaboration skills.",
      imgSrc:
        "https://images.unsplash.com/photo-1469289759076-d1484757abc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Team Building Workshop",
      startDate: "10 Mar 2024",
      endDate: "12 Mar 2024",
      description:
        "Join us for a team building workshop focused on communication and collaboration skills.",
      imgSrc:
        "https://images.unsplash.com/photo-1469289759076-d1484757abc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Team Building Workshop",
      startDate: "10 Mar 2024",
      endDate: "12 Mar 2024",
      description:
        "Join us for a team building workshop focused on communication and collaboration skills.",
      imgSrc:
        "https://images.unsplash.com/photo-1469289759076-d1484757abc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-white text-black h-full">
      <div className="lg:mr-24 border-r bg-white">
        <div className="bg-blue-500 w-full h-[200px] relative">
          <Image
            src="/img/background_picture.jpeg" // Replace with your image path
            alt="Background Image"
            layout="fill"
            objectFit="cover" // 'cover' will ensure the image covers the entire area
            className="absolute" // Position absolute to fit within the parent div
          />
        </div>

        <div className="relative bg-white w-full h-[200px]">
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
                    <MdEmail className="text-gray-500 text-sm mr-1" />
                    <div className="text-sm text-gray-500">{email}</div>
                  </div>
                )}
                <div className="flex items-center">
                  <PiBalloonBold className="text-gray-500 text-sm mr-1" />
                  <div className="text-sm text-gray-500">Born {birthDate}</div>
                </div>

                <div className="flex items-center">
                  <SlLocationPin className="text-gray-500 text-sm mr-1" />
                  <div className="text-sm text-gray-500">{province}</div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="absolute top-0 right-0 m-4">
                <button className="text-sm bg-white hover:bg-gray-100 py-2 px-4 rounded-full border border-gray-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-[50px] flex justify-center items-center border-b">
          <div className="text-gray-800">My events</div>
        </div>
        <div className="bg-white w-full h-[800px] px-10">
          {mockdata.map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
