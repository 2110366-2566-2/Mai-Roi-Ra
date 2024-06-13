"use client";
import Image from "next/image";
import styles from "@/styles/FontPage.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneScreen(window.innerWidth < window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:8080/api/v1/auth/google/login";
  };

  return (
    <div
      className={`${styles.Roboto} w-screen h-screen flex ${
        isPhoneScreen ? "flex-col" : "flex-row"
      } justify-start`}
    >
      {/* Banner Home Page On Left Size */}
      <div
        className={`${
          isPhoneScreen ? "w-full h-[60%]" : "w-[100%] h-screen"
        } overflow-hidden`}
      >
        <Image
          className="w-full h-full object-cover"
          src="/img/banner_homePage.png"
          alt="Failed To Load Image"
          width={1000}
          height={1000}
        />
      </div>

      {/* InFormation On Right Side */}
      <div
        className={
          "flex flex-col px-[8%] py-[10%] w-[100%] " +
          `${
            isPhoneScreen
              ? ""
              : "h-screen !py-[15%] items-center justify-center"
          }`
        }
      >
        <div
          className={`flex flex-col ${isPhoneScreen ? "items-center justify-start" : "items-start justify-center"}`}
        >
          <div
            className={`w-[60px] h-[60px] flex ${
              isPhoneScreen ? "justify-center" : "items-end mb-4"
            }`}
          >
            <Image
              className="w-[60px] h-[60px]"
              src="/img/icon_sunlight.png"
              alt="Failed To Load Image"
              width={1000}
              height={1000}
            />
          </div>

          <div
            className={`font-black w-full ${
              isPhoneScreen ? "text-center mb-2 text-4xl " : "text-7xl mb-4"
            }`}
          >
            Happening now
          </div>

          <div
            className={`font-black w-full ${
              isPhoneScreen ? "text-base text-center mb-4" : "text-4xl mb-5"
            }`}
          >
            Join MAI-ROI-RA today
          </div>

          <Link
            className={`bg-[#F2D22E] hover:bg-yellow-500 font-black py-[15px] rounded-full px-[65px] text-[12px] text-center ${
              isPhoneScreen ? "text-center mb-4" : "w-fit text-xl mb-2"
            }`}
            href="/auth/register"
          >
            Sign up with phone or email
          </Link>

          <div
            className={`w-full mt-2 ${isPhoneScreen ? "flex justify-center !mt-1" : ""}`}
          >
            <span className="ml-2">Already have an acoount?</span>
            <span className="ml-1">
              <Link
                className="text-sky-500 hover:underline hover:text-sky-600"
                href="/auth/signin"
              >
                Log in
              </Link>
            </span>
          </div>
          <button
            className="mt-2 px-4 py-2 border flex items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            onClick={handleLoginGoogle}
          >
            <img
              className="w-4 h-4"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[14px]">
              Login with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
