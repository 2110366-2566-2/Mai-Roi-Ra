"use client";
import { FormEvent, useState } from "react";
import styles from "@/styles/FontPage.module.css";
import Image from "next/image";
import RegisterInformationForm from "./RegisterInformationForm";
import RegisterAccountForm from "./RegisterAccountForm";

export default function RegisterForm() {
  // State if user want to sign up with phone number or email
  const [useEmail, setUseEmail] = useState(false);
  // State if user submit first sign up and begin to sign up information form
  const [fillInfo, setFillInfo] = useState(false);

  // Function to toggle between using email or phone number
  const toggleInputType = () => {
    setUseEmail(!useEmail);
  };

  // To make phone number input accept only numbers
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Allow only digits
    const validCharacters = /^[0-9]*$/;
    if (validCharacters.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  };

  const handleFirstSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form Submitted");
    setFillInfo(true);
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
            {fillInfo ? "Information" : "Create an account"}
          </div>
        </div>
        {fillInfo ? (
          <RegisterInformationForm
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
          ></RegisterInformationForm>
        ) : (
          <RegisterAccountForm
            useEmail={useEmail}
            phoneNumber={phoneNumber}
            toggleInputType={toggleInputType}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleFirstSubmit={handleFirstSubmit}
          ></RegisterAccountForm>
        )}
      </div>
    </div>
  );
}
