import EditProfileForm from "@/components/EditProfileForm";
import React, { Suspense } from "react";
import Image from "next/image";
import styles from "@/styles/FontPage.module.css";
import getProfile from "@/libs/getProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import EditProfileFormSkeleton from "@/components/skeletons/EditProfileFormSkeleton";
import showLoadingOverlay, {
  hideLoadingOverlay,
} from "@/components/GlobalLoading";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function EditProfile() {
  revalidatePath("/editprofile");
  revalidateTag("profile");
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.token) return null;
  const profile = session
    ? await getProfile(session.user.user_id, session.user.token)
    : null;

  return (
    <div className="flex flex-col items-center justify-center bg-white p-8">
      <Suspense fallback={<EditProfileFormSkeleton />}>
        <div className="flex flex-col items-center justify-center p-8 w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 h-auto">
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
            <div className={`${styles.Roboto} text-3xl text-gray-800`}>
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
            userId={session.user.user_id}
            token={session.user.token}
            firstRegister={false}
            user_image={profile.user_image}
          ></EditProfileForm>
        </div>
      </Suspense>
    </div>
  );
}
