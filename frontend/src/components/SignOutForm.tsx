'use client'
import { signOut, getSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignOut() {
    const router = useRouter();

    const handleSignOut = async () => {
        const session = await getSession();
        if (session) {
            await signOut({ redirect: false });
            router.push('/auth/login');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } router.back();
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Image className="blur-sm"
                src="/images/informationBg.jpg"
                alt="Error to load wallpaper"
                fill={true} />
            <div className="relative z-20 text-center text-black bg-white
            rounded-[10px] w-[30%] p-[20px]">
                <h1 className="text-3xl font-bold mb-4">Sign Out</h1>
                <p className="mb-8">Are you sure you want to sign out?</p>
                <button
                    onClick={handleSignOut}
                    className="rounded-lg w-[60%] text-[20px] bg-red-600 text-white ring-slate-600 p-[10px] 
                    duration-300 hover:bg-rose-800">
                    Sign Out
                </button>
            </div>
        </div>
    );
}