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
  // State if user fill all inputs
  const [allInputsFilled, setAllInputsFilled] = useState(true);
  // State if password is touched
  const [passwordTouched, setPasswordTouched] = useState(false);
  // State if phone number is touched
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);

  // USER INPUT
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Function to toggle between using email or phone number
  const toggleInputType = () => {
    setUseEmail(!useEmail);
  };

  // To make phone number input accept only numbers ////////
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Allow only digits
    const validCharacters = /^[0-9]*$/;
    if (validCharacters.test(event.target.value)) {
      const newPhoneNumber = event.target.value;
      setPhoneNumber(newPhoneNumber);
      setPhoneNumberTouched(true);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPasswordTouched(true);
    setPassword(newPassword);
  };
  ///////////////////////////////////////////////////////////

  const handleFirstSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Check if all fields are filled
    if (phoneNumber.length < 10 || phoneNumber[0] != "0") {
      setAllInputsFilled(false);
      console.log("invalid phone number");
      return;
    }
    if (password.length < 6) {
      setAllInputsFilled(false);
      console.log("invalid password");
      return;
    }
    if (
      (useEmail && name && email && password) ||
      (!useEmail && name && phoneNumber && password)
    ) {
      console.log("All fields are filled. Form submitted.");
      setFillInfo(true);
      // Here you can proceed with further form submission logic
    } else {
      console.log("Please fill in all fields.");
      setAllInputsFilled(false);
      // Here you can set error messages or highlight unfilled fields
    }
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
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            useEmail={useEmail}
            phoneNumber={phoneNumber}
            toggleInputType={toggleInputType}
            allInputsFilled={allInputsFilled}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleFirstSubmit={handleFirstSubmit}
            passwordTouched={passwordTouched}
            phoneNumberTouched={phoneNumberTouched}
          ></RegisterAccountForm>
        )}
      </div>
    </div>
  );
}
