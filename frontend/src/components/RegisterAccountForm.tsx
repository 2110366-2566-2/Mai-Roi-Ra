"use client";
import React, { useState } from "react";

interface RegisterAccountFormProps {
  email: string;
  name: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;

  isValidEmail: (email: string) => boolean;

  useEmail: boolean;
  phoneNumber: string;

  toggleInputType: () => void;
  allInputsFilled: boolean;

  passwordTouched: boolean;
  phoneNumberTouched: boolean;
  emailTouched: boolean;

  handlePhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFirstSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterAccountForm: React.FC<RegisterAccountFormProps> = ({
  email,
  name,
  setEmail,
  setName,
  password,
  setPassword,
  isValidEmail,
  useEmail,
  phoneNumber,
  toggleInputType,
  allInputsFilled,
  passwordTouched,
  phoneNumberTouched,
  emailTouched,
  handlePhoneNumberChange,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
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
        <div>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full px-4 py-4 rounded-lg text-gray-700 border outline-none ${
              passwordTouched && password.length < 6 ? "border-red-500" : ""
            }`}
            placeholder="Password (at least 6 letters)"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="ml-2 text-sm text-blue-500 bg-red-500">HI</button>
        </div>

        <div className="flex flex-col">
          <div style={{ color: "#F16E1E" }}>
            {passwordTouched && password.length < 6
              ? "Password must contain at least 6 letters"
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
