"use client";
import { divide } from "cypress/types/lodash";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterAccountFormProps {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;

  useEmail: boolean;
  toggleInputType: () => void;

  isValidEmail: (email: string) => boolean;
  allInputsFilled: boolean;
  passwordAreMatched: boolean;

  phoneNumberTouched: boolean;
  emailTouched: boolean;
  passwordTouched: boolean;
  confirmPasswordTouched: boolean;

  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;

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
  name,
  phoneNumber,
  email,
  password,
  confirmPassword,

  useEmail,
  toggleInputType,

  isValidEmail,
  allInputsFilled,
  passwordAreMatched,

  phoneNumberTouched,
  emailTouched,
  passwordTouched,
  confirmPasswordTouched,

  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,

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
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none `}
            placeholder={name ? "" : "Username"}
            onChange={handleNameChange}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
          {name.length != 0 && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Username
            </div>
          )}
        </div>

        <div className="relative">
          {useEmail ? (
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none  ${
                !isValidEmail(email) && emailTouched ? "border-red-500" : ""
              }`}
              placeholder="Email (eg. example@xmail.com)"
              onChange={handleEmailChange}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
          ) : (
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phoneNumber}
              className={`w-full px-4 py-4 border rounded-lg text-gray-700 outline-none  ${
                phoneNumberTouched &&
                (phoneNumber.length !== 10 || !phoneNumber.startsWith("0"))
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Phone number (eg. 0968800127)"
              maxLength={10}
              onChange={handlePhoneNumberChange}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
          )}
          {phoneNumber.length != 0 && !useEmail && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Phone number
            </div>
          )}
          {email.length != 0 && useEmail && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Email
            </div>
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
            className={`w-full px-4 py-4 rounded-lg text-gray-700 border outline-none  ${
              passwordTouched && password.length < 6 ? "border-red-500" : ""
            }`}
            placeholder="Password (at least 6 letters)"
            value={password}
            onChange={handlePasswordChange}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
          {password.length != 0 && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Password
            </div>
          )}
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
            className={`w-full px-4 py-4 rounded-lg text-gray-700 border outline-none `}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
          {confirmPassword.length != 0 && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Confirm Password
            </div>
          )}
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
