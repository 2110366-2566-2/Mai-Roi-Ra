"use client";
import React from "react";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiBalloonBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { MdVerified } from "react-icons/md";
import OTPModal from "./OTPModal";
import OTPInput from "./OTPInput";
import sendOTP from "@/libs/sendOTP";
import SuccessEmailVerificationModal from "./SuccessEmailVerificationModal";

interface Props {
  firstNameProp: string;
  lastNameProp: string;
  addressProp: string;
  districtProp: string;
  provinceProp: string;
  phoneNumberProp: string;
  emailProp: string;
  birthDateProp: string;
  usernameProp: string;
  user_id: string | null;
  emailIsVerified: boolean;
  token: string;
}

export default function ProfileUserInformation({
  firstNameProp,
  lastNameProp,
  addressProp,
  districtProp,
  provinceProp,
  phoneNumberProp,
  emailProp,
  birthDateProp,
  usernameProp,
  user_id,
  emailIsVerified,
  token,
}: Props) {
  // USER FIELDS
  const [firstName, setFirstName] = useState(firstNameProp);
  const [lastName, setLastName] = useState(lastNameProp);
  const [province, setProvince] = useState(provinceProp);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberProp);
  const [email, setEmail] = useState(emailProp);
  const [birthDate, setBirthDate] = useState(birthDateProp);
  const [username, setUsername] = useState(usernameProp);

  const reformatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formattedDate = reformatDate(birthDate);

  // OTP //
  const [isOtpModal, setIsOtpModal] = useState(false);
  const closeOtpModal = () => {
    setIsOtpModal(false);
  };
  const openOtpModal = () => {
    setIsOtpModal(true);
  };

  const [error, setError] = useState<string>("");

  const handleVerifyClick = async () => {
    toggleIsShowFirstSendOtp();
    try {
      await sendOTP(email, user_id || "", token);
    } catch (err) {
      setError("send verify fail!");
      console.log("Err: ", err);
    }
  };

  const [isShowFirstSendOtp, setIsShowFirstSendOtp] = useState(true);
  const toggleIsShowFirstSendOtp = () => {
    setIsShowFirstSendOtp(!isShowFirstSendOtp);
  };

  const [successModal, setSuccessModal] = useState(false);

  return (
    <div className="w-full">
      <SuccessEmailVerificationModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      ></SuccessEmailVerificationModal>

      <OTPModal
        isOpen={isOtpModal}
        closeModal={closeOtpModal}
        title="Verify your email"
      >
        <div className="mt-8">
          {!isShowFirstSendOtp ? (
            <OTPInput
              user_id={user_id || ""}
              email={email}
              openModal={openOtpModal}
              closeModal={closeOtpModal}
              successModal={successModal}
              setSuccessModal={setSuccessModal}
              token={token}
            ></OTPInput>
          ) : (
            <div>
              <div className="ml-6 mb-4">
                <p className="text-gray-800">
                  To verify your email address, you must enter the OTP that will
                  be sent to your email.
                </p>
              </div>
              <div className="flex justify-center items-center py-4">
                <button
                  className="bg-[#F2D22E] hover:bg-yellow-500 rounded-lg text-white py-2 px-16"
                  onClick={handleVerifyClick}
                >
                  Send OTP to my email
                </button>
              </div>
            </div>
          )}
        </div>
      </OTPModal>
      <div className="flex mt-14">
        <div className="text-xl ml-8">{firstName}</div>
        <div className="text-xl ml-2">{lastName}</div>
      </div>
      <div className="ml-10 flex">
        <div className="text-sm text-gray-500">@{username}</div>
        <div className="flex justify-center items-center ml-1">
          <MdVerified
            className={`${!emailIsVerified ? "text-gray-300" : "text-sky-500"}`}
          />
        </div>
      </div>
      <div className="mt-2 ml-16 space-y-2">
        {phoneNumber ? (
          <div className="flex items-center">
            <FaPhone className="text-gray-500 text-sm mr-1" />
            <div className="text-sm text-gray-500">{phoneNumber}</div>
          </div>
        ) : (
          <div className="flex items-center flex">
            <MdEmail className="text-gray-500 text-sm mr-1" />
            <div className="text-sm text-gray-500">{email}</div>
            {!emailIsVerified && (
              <button
                className="text-sm text-sky-500 ml-2 hover:underline"
                onClick={openOtpModal}
              >
                (click here to verify)
              </button>
            )}
          </div>
        )}
        <div className="flex items-center">
          <PiBalloonBold className="text-gray-500 text-sm mr-1" />
          <div className="text-sm text-gray-500">Born {formattedDate}</div>
        </div>

        <div className="flex items-center">
          <SlLocationPin className="text-gray-500 text-sm mr-1" />
          <div className="text-sm text-gray-500">{province}</div>
        </div>
      </div>
    </div>
  );
}
