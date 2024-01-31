"use client";
import React, { useState } from "react";

interface RegisterAccountFormProps {
  email: string;
  name: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;

  useEmail: boolean;
  phoneNumber: string;
  toggleInputType: () => void;
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
  useEmail,
  phoneNumber,
  toggleInputType,
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
            className="w-full px-4 py-4 border rounded-lg text-gray-700"
            placeholder="Name"
            onChange={handleNameChange}
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
              onChange={handleEmailChange}
            />
          ) : (
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
            onChange={handlePasswordChange}
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
  );
};

export default RegisterAccountForm;
