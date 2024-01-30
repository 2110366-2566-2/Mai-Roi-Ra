'use client'
import ThemeToggleButton from "./ThemeToggleButton"
import TopMenuItem from "./TopMenuItem"
import Image from "next/image"
import styles from "@/styles/FontPage.module.css";
import { Session } from "next-auth";

export default function TopMenuPanel({ role, sessionUser }: { role: string, sessionUser: Session }) {
    return (
        <div>
            <div
                className={`${styles.FiraSans} flex justify-start fixed flex-row h-[100px]
      top-0 right-0 left-0 z-30 items-center text-[5px] lg:text-[16px] md:text-[15px] sm:text-[10px] bg-opacity-50
      text-white font-normal w-screen backdrop-blur-lg dark:bg-slate-200 dark:text-black`}
            >
                <Image
                    src="/images/logo.png"
                    className="ml-[10%] w-[80px] h-[80px]"
                    alt="logo"
                    width={1000}
                    height={1000}
                />
                <div className="flex flex-row justify-around w-[40%]">
                    <TopMenuItem pageRef="/" title="Home" />
                    <TopMenuItem pageRef="/mybooking" title="My Booking" />
                    <TopMenuItem pageRef="/information" title="Information" />
                    {role == "admin" ? (
                        <TopMenuItem pageRef="/allbooking" title="All Booking" />
                    ) : null}
                </div>
                <div className="lg:w-[25%] md:w-[15%] sm:w-[7%] w-[0%]"></div>
                <TopMenuItem pageRef="/profile" title="Profile" />
                <div className="pr-[40px]"></div>
                <div className="flex items-center">
                    {sessionUser ? (
                        <TopMenuItem
                            pageRef="/api/auth/signout"
                            title={`Sign-Out of ${sessionUser.user?.name}`}
                        />
                    ) : (
                        <TopMenuItem pageRef="/api/auth/signin" title="Sign in" />
                    )}
                </div>
            </div>
            <div className="fixed left-0 top-0 z-50 p-4">
                <ThemeToggleButton />
            </div>
        </div>
    )
}