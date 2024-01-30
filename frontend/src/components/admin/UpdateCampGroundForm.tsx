'use client'
import { FormEvent, useState } from "react"
import { redirect, useRouter } from "next/navigation";
import { HandleUpdateCampground } from "./handler/HandleUpdateCampground";
import styles from "@/styles/FontPage.module.css"

interface Props {
    cid: string
    token: string
    cName: string
    cAddress: string
    cProvince: string
    cDistrict: string
    cPostalCode: string
    cTel: string
    cPicture: string
}

export default function UpdateCampGroundForm({ cid, token, cName, cAddress, cProvince, cDistrict, cPostalCode, cTel, cPicture }: Props) {

    const [name, setName] = useState<string>(cName);
    const [address, setAddress] = useState<string>(cAddress);
    const [district, setDistrict] = useState<string>(cDistrict);
    const [province, setProvince] = useState<string>(cProvince);
    const [postalCode, setPostalCode] = useState<string>(cPostalCode);
    const [tel, setTel] = useState<string>(cTel);
    const [picture, setPicture] = useState<string>(cPicture);
    const [error, setError] = useState<string>('');

    const handleUpdateCampground = async () => {
        try {
            if (name.length > 50) {
                setError("Name cannot be more than 50 characters");
                return;
            }
            if (postalCode.length > 5) {
                setError("Postal code cannot be more than 5 digits");
                return
            }
            if (!picture.includes("https://drive.google.com")) {
                setError("Invalid Picture URI");
                return;
            }
            await HandleUpdateCampground(cid, name, address, district, province, postalCode, tel, picture, token);
        } catch (err) {
            setError("Updated Failed. Please check the constraint.")
            console.log(err)
        }
    }

    return (
        <div className={`${styles.campgroundFont} h-[70%] rounded-[10px] opacity-60 
        text-white dark:text-black border-white dark:border-black w-full border-2
        pt-[30px] hover:opacity-100 transition-opacity duration-300 relative`}>
            <div className="text-white dark:text-black text-[2vw] text-center font-semibold">
                Update Campground Form
            </div>
            <form action={handleUpdateCampground} className="relative opacity-100 mt-[25px] mr-[40px]">

                <div className="relative opacity-100 ml-[20px] mt-[25px] mr-[40px]">
                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="name" className="ml-[15px] block text-[1.25vw] w-full opacity-60 ">
                                Campground Name
                            </label>
                            <input type="text" required id="name" name="name" placeholder="Insert Campground Name"
                                className="bg-black dark:bg-white border-2 text-white dark:text-black border-gray-200 rounded w-full p-2 
                            ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="address" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                Address
                            </label>
                            <input type="text" required id="address" name="address" placeholder="Insert Address"
                                className="bg-black dark:bg-white text-white dark:text-black border-2 border-gray-200 rounded w-full p-2  
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="district" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                District
                            </label>
                            <input type="text" required id="district" name="district" placeholder="Insert District"
                                className="bg-black dark:bg-white text-white dark:text-black border-2 border-gray-200 rounded w-full p-2
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="province" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                Province
                            </label>
                            <input type="text" required id="province" name="province" placeholder="Insert Province"
                                className="bg-black dark:bg-white text-white dark:text-black border-2 rounded w-full p-2
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="postalCode" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                Postal Code
                            </label>
                            <input type="text" required id="postalCode" name="postalCode" placeholder="Insert Postal Code"
                                className="bg-black dark:bg-white text-white dark:text-black border-2 rounded w-full p-2 
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="tel" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                Tel.
                            </label>
                            <input type="text" required id="tel" name="tel" placeholder="Insert Tel"
                                className="bg-black dark:bg-white text-white dark:text-black border-2 border-2 rounded w-full p-2   
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center w-full my-2">
                        <div className="w-full">
                            <label htmlFor="picture" className="ml-[15px] block text-[1.25vw] w-full opacity-60">
                                Picture
                            </label>
                            <input type="text" required id="picture" name="picture" placeholder="Insert Picture URI"
                                className="bg-black dark:bg-white text-white dark:text-black border-2 rounded w-full p-2
                                ml-[30px] focus:outline-none indent-3 focus:border-blue-400 transition duration-300"
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)} />
                        </div>
                    </div>

                    <div className="py-[40px] space-x-[20px] flex flex-col items-center">
                        <button
                            type="submit"
                            className="opacity-100 rounded-full w-full text-[20px] bg-[#ffa900] text-white dark:text-black ring-slate-600 p-[10px] py-[10px] 
                        duration-300 hover:bg-indigo-800 ml-[50px] ">
                            Update This Campground
                        </button>

                        {error && (
                            <div className="bg-red-500 text-white w-fit py-1 px-3 rounded flex justify-center items-center mt-10 text-[20px]">
                                {error}
                            </div>
                        )}
                    </div>

                </div>
            </form>
        </div>
    )
}