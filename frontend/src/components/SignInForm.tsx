"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/FontPage.module.css";
import Link from "next/link";
import Image from "next/image";
import SignInHandleSubmit from "./SignInHandleSubmit";
import { TextField } from "@mui/material";
import LoadingLine from "./LoadingLine";
import { apiBackUrl, provider } from "@/constants";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<number>(0);
  const [errorPassword, setErrorPassword] = useState<number>(0);

  const ErrorUser = [
    "Please fill your phone number or email address",
    "Not phone number or email address format",
    "This username is not registered yet",
  ];

  const ErrorPassword = ["Please fill your password", "Incorrect password"];

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await SignInHandleSubmit(
      e,
      setUser,
      setPassword,
      setError,
      setErrorUser,
      setErrorPassword,
      user,
      password,
      error,
      router,
      setIsLoading // Pass setIsLoading to handle loading state inside SignInHandleSubmit
    );
  };

  const handleLoginGoogle = () => {
    window.location.href = `${apiBackUrl}/api/v1/auth/google/login`;
  }

  return (
    <div className="text-black bg-white w-screen h-screen flex justify-center items-center">
      <div
        className={` text-center lg:w-[450px] lg:h-[450px] md:w-[350px] md:h-[350]`}
      >
        <div className="lg:w-[60px] lg:h-[60px] md:w-[50px] md:h-[50px] sm:w-[40px] sm:h-[40px] h-[30px] w-[30px]">
          <Image
            src="/img/icon_sunlight.png"
            alt="Failed To Load Image"
            width={1000}
            height={1000}
          />
        </div>

        <div
          className={`${styles.Roboto} w-full lg:text-[42px] md:text-[35px] sm:text-[30px] text-[25px] mt-[10px] font-black`}
        >
          Log in to MAI-ROI-RA
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 w-full lg:text-[16px] md:text-[16px] sm:text-[14px] text-[12px]">
            <div className="relative">
              <input
                className={`w-full px-4 py-4 rounded-md border-gray-200 
                            border  ${
                              errorUser ? "border-red-500" : "border-black"
                            } focus:outline-none`}
                type="text"
                placeholder="Phone number, email address"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />

              {user.length != 0 && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                  Phone number, email address
                </div>
              )}
              {errorUser ? (
                <div className="w-full text-start mt-[20px] text-red-500 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">
                  {ErrorUser[errorUser - 1]}
                </div>
              ) : null}
            </div>

            <div className="relative mt-4">
              <input
                className={`w-full px-4 py-4 rounded-md border-gray-200 
                            border  ${
                              errorPassword ? "border-red-500" : "border-black"
                            } focus:outline-none`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {password.length != 0 && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                  Password
                </div>
              )}
              {errorPassword ? (
                <div className="w-full text-start mt-[20px] text-red-500 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">
                  {ErrorPassword[errorPassword - 1]}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-8">{isLoading && <LoadingLine />}</div>

          <div className="mt-10">
            <button
              type="submit"
              className=" w-full text-white px-4 py-4 rounded-full bg-[#F2D22E] hover:bg-yellow-500 text-white lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]"
            >
              Log in
            </button>
          </div>
        </form>

        <div
          className="flex justify-between w-full text-sky-500 mt-[30px] 
                    lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] items-center"
        >
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={handleLoginGoogle}>
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">Login with Google</span>
        </button>
          <Link
            href="/auth/register"
            className="hover:text-sky-600 hover:underline"
          >
            Sign up
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SignInForm;
