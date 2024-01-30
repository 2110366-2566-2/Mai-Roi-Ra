import CampgroundCatalog from "@/components/CampgroundCatalog";
import getCampgrounds from "@/libs/getCampgrounds";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import styles from "@/styles/FontPage.module.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import CreateCampGroundForm from "@/components/admin/CreateCampGroundForm";
import Link from "next/link";
import Image from "next/image";
import PromoteCard from "@/components/PromoteCard";
import { FaHeart } from "react-icons/fa";

export default async function CampGround() {
  const campgrounds = await getCampgrounds();
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.token) return null;
  const profile = session ? await getUserProfile(session.user.token) : null;
  console.log("Token:", session.user.token)
  return (
    <div>
      <Suspense fallback={
        <div className="w-screen h-screen">
          <p className={`${styles.allFont} relative text-[40px] font-bold 
            text-center mt-[130px] text-white dark:text-black`}>Loading...</p>
          <LinearProgress />
        </div>
      }>
        <div>
          <div>
            <Image className="w-screen h-[120%]"
              src="/images/informationBg.jpg"
              alt="Error to down load background"
              width={1000}
              height={1000} />
          </div>
          <div className={`${styles.Roboto} text-center font-bold relative 
           text-white text-[3.5vw] mt-[6%] w-screen dark:text-black`}>
            <h1>Find Yourself</h1>
            <h1>Campground Outside 🏕️</h1>
            <div className="mt-[20px] text-[1vw] dark:text-black text-gray-100 opacity-80 font-light ">
              <p>Escape to nature's embrace at our serene campground—where</p>
              <p>memories are made under starlit skies. </p>
            </div>
          </div>

          <div className="flex flex-row flex-wrap justify-center w-screen mt-[80px]
            space-x-[70px] text-white">
            <PromoteCard picture="✨" topic="Traveler-Friendly" detail="Enter your details with ease, 
              starting with your name. Our user-friendly form 
              ensures a seamless booking experience."/>
            <PromoteCard picture="🏞️" topic="Choose Your Spot" detail=" Indicate your preferred campground, 
              whether it's the peaceful Guncv Pattaya Campground or one of our other scenic locations."/>
            <PromoteCard picture="📅" topic="Reserve Your Dates" detail="Select your desired dates with our interactive calendar. 
              Plan your getaway for a day, two days, or extend your adventure for three days of pure bliss."/>
            <PromoteCard picture="👫" topic="Perfect for Groups" detail="Specify the number of people joining your 
              camping expedition. Whether solo or with a group of friends, we have the ideal spot for every adventurer."/>
          </div>

          <div className="flex flex-row justify-center mt-[50px]">
            <Image className="w-[10%] h-[10%]"
              src="/images/camping.png"
              alt="Error For load picture"
              width={1000}
              height={1000} />
          </div>

          <div className={`${styles.Roboto} dark:text-black text-center text-white font-bold text-[3.5vw]`}>
            <h1>Let Explore The Campground {`&`}</h1>
            <h1>Date That You Want</h1>
          </div>
        </div>



        <div className="w-screen px-[50px] mb-[80px] dark:bg-slate-100">
          <div className="mt-[50px] border-white dark:border-black border-[3px] rounded-3xl w-full">
            <CampgroundCatalog campJson={campgrounds} />
          </div>
        </div>

        {
          (profile?.data.role == "admin") ?
            <div>
              <div className={`${styles.Roboto} dark:text-black text-center text-white font-bold text-[3.5vw]`}>
                <h1>👑 Hello Admin 👑</h1>
                <div className="dark:text-black mt-[20px] text-[1vw] text-gray-100 opacity-80 font-light ">
                  <p className="text-[25px] font-semibold mb-5">You can create campground here !</p>
                  <p className="text-[20px] mb-3">The constraints on creating new campground are ...</p>
                  <div className="text-[20px] space-y-3">
                    <li>Campground Name length can't be more than 50 lengths</li>
                    <li>Campground Name can't be the same as the existed one</li>
                    <li>Postal code length can't be more than 5 lengths</li>
                    <li>The picture must be in google drive form</li>
                  </div>
                </div>
              </div>
              <div className="my-[60px] px-[90px]">
                <CreateCampGroundForm userToken={session.user.token} />
              </div>
            </div>
            :
            null
        }
      </Suspense>
    </div>

  )
}
