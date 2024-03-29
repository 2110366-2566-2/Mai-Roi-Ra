"use server";
import React, { Suspense } from "react";
import EventItem from "@/components/EventItem";
import Image from "next/image";
import getProfile from "@/libs/getProfile";
import EditProfileButton from "@/components/EditProfileButton";
import { revalidateTag } from "next/cache";
import ProfileUserInformation from "@/components/ProfileUserInformation";
import getMyOrganizerEvents from "@/libs/getMyOrganizerEvents";
import getMyUserEvents from "@/libs/getMyUserEvents";
import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import EventsList from "@/components/EventsList";
import isEmailVerified from "@/libs/isEmailVerified";
import ProfilePageSkeleton from "@/components/skeletons/ProfilePageSkeleton";

export default async function Profile() {
  revalidateTag("profile");

  // get user profile from user_id from session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.token) return null;
  const profile = session ? await getProfile(session.user.user_id) : null;

  let events;
  let datas;
  let role;
  if (session.user.organizer_id?.length == 0) {
    events = await getMyUserEvents(session.user.user_id);
    datas = events?.event_list;
    role = "USER";
  } else {
    events = await getMyOrganizerEvents(session.user.organizer_id);
    datas = events?.event_lists;
    role = "ORGANIZER";
  }

  let emailIsVerified = false;
  if (profile.email) {
    const response = await isEmailVerified(profile.email);
    emailIsVerified = response ? true : false;
  }

  return (
    <div className="bg-white text-black">
      <Suspense fallback={<ProfilePageSkeleton></ProfilePageSkeleton>}>
        <div className="lg:mr-24 border-r border-b bg-white min-h-screen">
          <div className="w-full h-[200px] relative">
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
                user_id={session.user.user_id}
                emailIsVerified={emailIsVerified}
              ></ProfileUserInformation>
              <EditProfileButton
                isEnableNotificationProp={profile.is_enable_notification}
                userIDProp={session.user.user_id}
              ></EditProfileButton>
            </div>
          </div>
          <div className="bg-white w-full h-[50px] flex justify-center items-center border-b">
            <div className="text-gray-800">My events</div>
          </div>

          <div className="pt-8 pl-10">
            <div className="flex flex-row justify-start w-full">
              <input
                type="text"
                id="search-event"
                name="search-event"
                placeholder="Search"
                className="border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[70%] md:w-[70%] w-[55%] mr-[20px] pl-2"
              />
              <button
                className="border border-slate-400 rounded-xl lg:h-[30px] md:h-[30px] h-[23px] lg:w-[80px] md:w-[80px] w-[65px] hover:scale-105 duration-300
                lg:ml-[20px] md:ml-[15px] sm:ml-[10px] ml-[10px]"
              >
                Filter
              </button>
            </div>
          </div>
          <EventsList datas={datas} role={role}></EventsList>
        </div>
      </Suspense>
    </div>
  );
}
