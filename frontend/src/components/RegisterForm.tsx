"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/FontPage.module.css";
import Image from "next/image";
import RegisterInformationForm from "./RegisterInformationForm";
import RegisterAccountForm from "./RegisterAccountForm";

export default function RegisterForm() {
  // ** I don't know why `import { useRouter } from "next/navigation";` works, I thought it should be `next/router`
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/signin");
  };

  // USER INPUT
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State if user want to sign up with phone number or email
  const [useEmail, setUseEmail] = useState(false);
  // State if user submit first sign up and begin to sign up information form
  const [fillInfo, setFillInfo] = useState(false);
  // State if user fill all inputs
  const [allInputsFilled, setAllInputsFilled] = useState(true);
  // State if password is touched
  const [passwordTouched, setPasswordTouched] = useState(false);
  // State if confirm-password is touched
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  // State if phone number is touched
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  // State if email is touched
  const [emailTouched, setEmailTouched] = useState(false);
  // State if show password
  const [showPassword, setShowPassword] = useState(false);
  // State if show confirm-password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State if password and confirm-password is matched
  const [passwordAreMatched, setPasswordAreMatched] = useState(true);

  // Function to toggle between using email or phone number
  const toggleInputType = () => {
    setUseEmail(!useEmail);
  };

  // Function if the email is valid
  const isValidEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle confirm-password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handlers for fields
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8">
      <div className="flex flex-col items-center justify-center bg-white p-8 w-full sm:w-3/5 lg:w-3/5 xl:w-2/5 h-auto">
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
            handleBackwardClick={handleBackwardClick}
            handleRedirect={handleRedirect}
          ></RegisterInformationForm>
        ) : (
          <RegisterAccountForm
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            useEmail={useEmail}
            phoneNumber={phoneNumber}
            toggleInputType={toggleInputType}
            allInputsFilled={allInputsFilled}
            passwordAreMatched={passwordAreMatched}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            handleFirstSubmit={handleFirstSubmit}
            isValidEmail={isValidEmail}
            emailTouched={emailTouched}
            phoneNumberTouched={phoneNumberTouched}
            passwordTouched={passwordTouched}
            confirmPasswordTouched={confirmPasswordTouched}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          ></RegisterAccountForm>
        )}
      </div>
    </div>
  );
}
