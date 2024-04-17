"use client"
import EditProfileForm from "@/components/EditProfileForm";
import React from "react";
import Image from "next/image";
import styles from "@/styles/FontPage.module.css";
import getProfile from "@/libs/getProfile";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingLine from "@/components/LoadingLine";

interface Props {
  first_name: string | null;
  last_name: string | null;
  address: string | null;
  district: string | null;
  province: string | null;
  phone_number: string | null;
  email: string | null;
  birth_date: string | null;
  user_image: string | null;
}

export default function OAuthFirstRegister() {
  const router = useRouter();
  // const profile = await getProfile("550e8400-e29b-41d4-a716-446655440100");

  const {data: session} = useSession();
  const [profile, setProfile] = useState<Props | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        setProfile(null); // Reset profile data
        setLoading(true); // Start loading
  
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        const profileData = await getProfile(session.user.user_id);
        setProfile(profileData);
        setLoading(false); // End loading
      }
    };
  
    fetchProfile();
  }, [session]);
  console.log("profile",profile)
  if (session?.user?.username !== "") {
    if(session){
      router.push('/homepage');
    }else{
      router.push('/auth/signin');
    }
    return (
      <div className="w-screen h-screen flex items-center justify-center text-center flex-col">
        <h1 className="mb-5">You don't have permission.</h1>
        <LoadingLine />
      </div>
    );
  }

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
          <div className={`${styles.Roboto} text-3xl mt-6 text-gray-800 font-bold text-center`}>
            Please Enter your information.
          </div>
        </div>
        {!loading ? <EditProfileForm
          firstRegister={true}
          firstNameProp={profile?.first_name || null }
          lastNameProp={profile?.last_name || null }
          addressProp={profile?.address || null }
          districtProp={profile?.district || null }
          provinceProp={profile?.province || null }
          phoneNumberProp={profile?.phone_number || null }
          emailProp={profile?.email || null }
          birthDateProp={profile?.birth_date || null}
          userId={session?.user?.user_id || null}
          token={session?.user?.token}
          user_image={profile?.user_image || null}
        ></EditProfileForm>
        :
        <LoadingLine></LoadingLine>
        }
      </div>
    </div>
  );
}
