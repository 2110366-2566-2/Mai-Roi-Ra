'use client'
import Image from "next/image";
import styles from "@/styles/FontPage.module.css"
import Link from "next/link";


export default function HomePage() {

    return (
        <div className={`${styles.Roboto} w-screen h-screen flex flex-row justify-start`}>

            {/* Banner Home Page On Left Size */}
            <div className="w-[50%] h-screen">
                <Image className="w-full h-full"
                src="/img/banner_homePage.png"
                alt="Failed To Load Image"
                width={1000}
                height={1000}/>
            </div>

            {/*InFormation On Right Side*/}
            <div className="flex justify-center flex-row flex-wrap px-[8%] py-[10%] w-[50%] h-screen">

                <div className="w-full flex items-end">
                    <Image className="w-[60px] h-[60px]"
                    src="/img/icon_sunlight.png"
                    alt="Failed To Load Image"
                    width={1000}
                    height={1000}/>
                </div>

                <div className="text-[30px] lg:text-[84px] md:text-[64px] sm:text-[40px] font-black w-full flex items-center">
                    Happening now
                </div>
            
                <div className="text-[20px] lg:text-[42px] md:text-[30px] sm:text-[20px] font-black w-full">
                    Join MAI-ROI-RA today
                </div>

                <div className="w-full">
                    <Link className="bg-sky-500 font-black lg:text-[20px] md:text-[15px] sm:text-[10px] text-[7px] 
                    py-[15px] font=black rounded-full 
                    px-[65px] hover:bg-sky-400" 
                    href="/auth/register">
                        Sign up with phone or email
                    </Link>
                </div>
                
                <div className="w-full">
                    <span>
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
    )
}