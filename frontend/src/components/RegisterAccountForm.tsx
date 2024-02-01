"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterAccountFormProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;

  isValidEmail: (email: string) => boolean;

  useEmail: boolean;
  phoneNumber: string;

  toggleInputType: () => void;
  allInputsFilled: boolean;

  passwordTouched: boolean;
  confirmPasswordTouched: boolean;
  phoneNumberTouched: boolean;
  emailTouched: boolean;

  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;

  passwordAreMatched: boolean;

  handlePhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFirstSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterAccountForm: React.FC<RegisterAccountFormProps> = ({
  email,
  name,
  password,
  confirmPassword,
  isValidEmail,
  useEmail,
  phoneNumber,
  toggleInputType,
  allInputsFilled,
  passwordTouched,
  confirmPasswordTouched,
  passwordAreMatched,
  phoneNumberTouched,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  emailTouched,
  handlePhoneNumberChange,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handleFirstSubmit,
}) => {
  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleFirstSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className="w-full px-4 py-4 border rounded-lg text-gray-700 outline-none"
            placeholder="Username"
            onChange={handleNameChange}
          />
        </div>
        <div>
          {useEmail ? (
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className={`w-full px-4 py-4 border rounded-lg text-gray-700 outline-none ${
                !isValidEmail(email) && emailTouched ? "border-red-500" : ""
              }`}
              placeholder="Email (eg. example@xmail.com)"
              onChange={handleEmailChange}
            />
          ) : (
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              id="phone"
              name="phone"
              className={`w-full px-4 py-4 border rounded-lg text-gray-700 outline-none ${
                phoneNumberTouched &&
                (phoneNumber.length !== 10 || !phoneNumber.startsWith("0"))
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Phone number (eg. 0968800127)"
              maxLength={10}
            />
          )}
        </div>
        <div className="flex flex-col">
          <div style={{ color: "#F16E1E" }}>
            {phoneNumberTouched &&
            (phoneNumber.length !== 10 || !phoneNumber.startsWith("0")) &&
            !useEmail
              ? "Phone number must be valided"
              : ""}
          </div>
          <div style={{ color: "#F16E1E" }}>
            {!isValidEmail(email) && useEmail && emailTouched
              ? "Email must be valided"
              : ""}
          </div>
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={`w-full px-4 py-4 rounded-lg text-gray-700 border outline-none ${
              passwordTouched && password.length < 6 ? "border-red-500" : ""
            }`}
            placeholder="Password (at least 6 letters)"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 mr-4 text-gray-300 hover:text-gray-400"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size="18px" /> : <FaEye size="18px" />}
          </button>
        </div>
        <div>
          <div style={{ color: "#F16E1E" }}>
            {passwordTouched && password.length < 6
              ? "Password must contain at least 6 letters"
              : ""}
          </div>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            name="confirm-password"
            className={`w-full px-4 py-4 rounded-lg text-gray-700 border outline-none`}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 mr-4 text-gray-300 hover:text-gray-400"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <FaEyeSlash size="18px" />
            ) : (
              <FaEye size="18px" />
            )}
          </button>
        </div>

        <div className="flex flex-col">
          <div style={{ color: "#F16E1E" }}>
            {passwordTouched && confirmPasswordTouched && !passwordAreMatched
              ? "Passwords are not matched"
              : ""}
          </div>
          <div style={{ color: "#F16E1E" }}>
            {allInputsFilled ? "" : "All fields must be filled correctly !"}
          </div>
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
  );
};

export default RegisterAccountForm;
