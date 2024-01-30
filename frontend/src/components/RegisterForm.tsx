"use client";
import { FormEvent, useState } from "react";
import styles from "@/styles/FontPage.module.css";
import Image from "next/image";

export default function RegisterForm() {
  // State if user want to sign up with phone number or email
  const [useEmail, setUseEmail] = useState(false);

  // Function to toggle between using email or phone number
  const toggleInputType = () => {
    setUseEmail(!useEmail);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      <div className="flex flex-col items-center justify-center bg-white p-8 w-2/5 h-auto">
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
            Create an account
          </div>
        </div>
        <div className="w-full">
          <form className="space-y-6">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-4 border rounded-lg text-gray-700"
                placeholder="Name"
              />
            </div>
            <div>
              {useEmail ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-4 border rounded-lg text-gray-700"
                  placeholder="Email"
                />
              ) : (
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-4 border rounded-lg text-gray-700"
                  placeholder="Phone number"
                />
              )}
            </div>
            <div className="flex">
              <div
                style={{ color: "#1EA1F1" }}
                className="cursor-pointer"
                onClick={toggleInputType}
              >
                {useEmail ? "Use Phone Number" : "Use Email"}
              </div>
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-4 border rounded-lg text-gray-700"
                placeholder="Password"
              />
            </div>
            <div className="pt-8">
              <button
                type="submit"
                className="w-full text-white px-4 py-4 rounded-full hover:bg-blue-600"
                style={{ backgroundColor: "#1EA1F1" }}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
