import EditProfileForm from "@/components/EditProfileForm";
import React from "react";
import Image from "next/image";
import styles from "@/styles/FontPage.module.css";
import getProfile from "@/libs/getProfile";
// import UpdateProfile from "@/components/admin/UpdateProfile";

export default async function EditProfile() {
  const profile = await getProfile("550e8400-e29b-41d4-a716-446655440100");
  console.log(profile);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      <div className="flex flex-col items-center justify-center bg-white p-8 w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 h-auto">
        <div className="">
          <div className="w-[60px] h-[60px]">
            <Image
              src="/img/icon_sunlight.png"
              alt="Failed To Load Image"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="w-full">
          <div className={`${styles.Roboto} text-3xl my-6 text-gray-800`}>
            Information
          </div>
        </div>
        <EditProfileForm
          firstNameProp={profile.first_name}
          lastNameProp={profile.last_name}
          addressProp={profile.address}
          districtProp={profile.district}
          provinceProp={profile.province}
          phoneNumberProp={profile.phone_number}
          emailProp={profile.email}
          birthDateProp={profile.birth_date}
        ></EditProfileForm>
      </div>
    </div>
  );
}
