"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/FontPage.module.css";
import Image from "next/image";
import RegisterInformationForm from "./RegisterInformationForm";
import RegisterAccountForm from "./RegisterAccountForm";

export default function RegisterForm() {
  // ** I don't know why `import { useRouter } from "next/navigation";` works, I thought it should be `next/router`

  // USER INPUTS (first page)
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // USER INPUTS (second page)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");

  // State if user want to sign up with phone number or email
  const [useEmail, setUseEmail] = useState(false);
  // State if user fill all inputs
  const [allInputsFilled, setAllInputsFilled] = useState(true);
  // State if password and confirm-password is matched
  const [passwordAreMatched, setPasswordAreMatched] = useState(true);
  // State if user submit first sign up and begin to sign up information form
  const [fillInfo, setFillInfo] = useState(false);

  // State if user fill all info inputs
  const [allInfoInputsFilled, setAllInfoInputsFilled] = useState(true);

  // State if phone number is touched
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  // State if email is touched
  const [emailTouched, setEmailTouched] = useState(false);
  // State if password is touched
  const [passwordTouched, setPasswordTouched] = useState(false);
  // State if confirm-password is touched
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // State if show password
  const [showPassword, setShowPassword] = useState(false);
  // State if show confirm-password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function if the email is valid
  const isValidEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
  };

  // Function to toggle between using email or phone number
  const toggleInputType = () => {
    setUseEmail(!useEmail);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    if (showPassword == false) {
      setShowPassword(true);
      setTimeout(() => {
        setShowPassword((prev) => !prev);
      }, 2000);
    }
  };

  // Function to toggle confirm-password visibility
  const toggleConfirmPasswordVisibility = () => {
    if (showConfirmPassword == false) {
      setShowConfirmPassword(true);
      setTimeout(() => {
        setShowConfirmPassword((prev) => !prev);
      }, 2000);
    }
  };

  //---- Handlers for fisrt page fields ----//
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const validCharacters = /^[0-9]*$/;
    if (validCharacters.test(event.target.value)) {
      const newPhoneNumber = event.target.value;
      setPhoneNumber(newPhoneNumber);
      setPhoneNumberTouched(true);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailTouched(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPasswordTouched(true);
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPasswordTouched(true);
    setConfirmPassword(newConfirmPassword);
  };

  //---- Handler for second page fields ----//
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFirstName = event.target.value;
    setFirstName(newFirstName);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = event.target.value;
    setLastName(newLastName);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDistrict = event.target.value;
    setDistrict(newDistrict);
  };

  const handleProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProvince = event.target.value;
    setProvince(newProvince);
  };

  // Function for backward click from info form to first form

  const handleBackwardClick = () => {
    setFillInfo(false);
  };

  ///////////////////////////////////////////////////////////

  const handleFirstSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!useEmail && (phoneNumber.length < 10 || phoneNumber[0] != "0")) {
      setAllInputsFilled(false);
      console.log("invalid phone number");
      return;
    }
    if (useEmail && !isValidEmail(email)) {
      setAllInputsFilled(false);
      console.log("invalid email");
      return;
    }
    if (password.length < 6) {
      setAllInputsFilled(false);
      console.log("invalid password");
      return;
    }
    if (confirmPassword != password) {
      setPasswordAreMatched(false);
      setAllInputsFilled(false);
      console.log("password do not match");
      return;
    } else {
      setPasswordAreMatched(true);
    }
    if (
      (useEmail && name && email && password && confirmPassword) ||
      (!useEmail && name && phoneNumber && password && confirmPassword)
    ) {
      console.log("All fields are filled. Form submitted.");
      setFillInfo(true);
      setAllInputsFilled(true);
    } else {
      console.log("Please fill in all fields.");
      setAllInputsFilled(false);
    }
  };

  ///////////////////////////////////////
  const router = useRouter();

  const handleInfoSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (firstName && lastName && address && district && province) {
      console.log("All info fields are filled. Form submitted.");
      setAllInfoInputsFilled(true);
      router.push("/auth/signin");
    } else {
      console.log("Please fill in all info fields.");
      setAllInfoInputsFilled(false);
    }
  };
  ///////////////////////////////////////

  // const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      <div className="flex flex-col items-center justify-center bg-white p-8 w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 h-auto">
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
            firstName={firstName}
            lastName={lastName}
            address={address}
            district={district}
            province={province}
            phoneNumber={phoneNumber}
            email={email}
            useEmail={useEmail}
            allInfoInputsFilled={allInfoInputsFilled}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleAddressChange={handleAddressChange}
            handleDistrictChange={handleDistrictChange}
            handleProvinceChange={handleProvinceChange}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleBackwardClick={handleBackwardClick}
            handleInfoSubmit={handleInfoSubmit}
          ></RegisterInformationForm>
        ) : (
          <RegisterAccountForm
            name={name}
            phoneNumber={phoneNumber}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            useEmail={useEmail}
            toggleInputType={toggleInputType}
            isValidEmail={isValidEmail}
            allInputsFilled={allInputsFilled}
            passwordAreMatched={passwordAreMatched}
            phoneNumberTouched={phoneNumberTouched}
            emailTouched={emailTouched}
            passwordTouched={passwordTouched}
            confirmPasswordTouched={confirmPasswordTouched}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            handleFirstSubmit={handleFirstSubmit}
          ></RegisterAccountForm>
        )}
      </div>
      {/* {modal && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75"
            onClick={toggleModal}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-lg max-w-lg w-full min-h-[500px] z-50">
            <p className="text-xl font-semibold">Setting</p>
            <button className="text-white bg-purple-500 hover:bg-purple-700 py-2 px-4 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
