'use client'
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

    return (
        <div className={`${styles.Roboto} w-screen h-screen flex ${isPhoneScreen ? 'flex-col' : 'flex-row'} justify-start`}>

            {/* Banner Home Page On Left Size */}
            <div className={`${isPhoneScreen ? 'w-full h-[60%]' : 'w-[100%] h-screen'} overflow-hidden`}>
                <Image
                    className="w-full h-full object-cover"
                    src="/img/banner_homePage.png"
                    alt="Failed To Load Image"
                    width={1000}
                    height={1000}
                />
            </div>

            {/* InFormation On Right Side */}
            <div className={"flex flex-col px-[8%] py-[10%] w-[100%] " + `${isPhoneScreen ? 'h-[40%] items-center justify-start !p-8' : 'h-screen !py-[15%]'}`}>
                <div className={`w-[60px] h-[60px] flex ${isPhoneScreen ? 'justify-center' : 'items-end mb-4'}`}>
                    <Image className="w-[60px] h-[60px]"
                    src="/img/icon_sunlight.png"
                    alt="Failed To Load Image"
                    width={1000}
                    height={1000}/>
                </div>
                
                <div className={`font-black w-full ${isPhoneScreen ? 'text-center mb-2 text-4xl ' : 'text-8xl mb-4'}`}>
                    Happening now
                </div>
            
                <div className={`font-black w-full ${isPhoneScreen ? 'text-base text-center mb-4' : 'text-5xl mb-10'}`}>
                    Join MAI-ROI-RA today
                </div>


                <Link className={`bg-sky-500 font-black py-[15px] rounded-full px-[65px] hover:bg-sky-400 text-[12px] text-center ${isPhoneScreen ? 'text-center mb-4' : 'w-fit text-xl mb-4'}`} 
                href="/auth/register">
                    Sign up with phone or email
                </Link>
                
                <div className={`w-full ${isPhoneScreen ? 'flex justify-center' : ''}`}>
                    <span className="ml-2">
                        Already have an acoount?
                    </span>
                    <span className="ml-[3px]">
                        <Link className="text-sky-500 hover:underline hover:text-sky-600" 
                        href="/auth/signin">
                            Log in
                        </Link>
                    </span>
                </div>
            </div>

        </div>
    );
}
