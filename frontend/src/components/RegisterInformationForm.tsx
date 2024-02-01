"use client";
import React, { useState } from "react";

interface RegisterInformationFormProps {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  handlePhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackwardClick: () => void;
}

const RegisterInformationForm: React.FC<RegisterInformationFormProps> = ({
  phoneNumber,
  setPhoneNumber,
  handlePhoneNumberChange,
  handleBackwardClick,
}) => {
  return (
    <div className="w-full">
      <div className="absolute top-0 left-0 mt-12 ml-16">
        <button
          className="text-4xl"
          style={{ color: "#1EA1F1" }}
          onClick={handleBackwardClick}
        >
          &#60; {/* Backward button */}
        </button>
      </div>
      <form className="space-y-6">
        <div className="flex">
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="w-full px-4 py-4 mr-2 border rounded-lg text-gray-700"
            placeholder="First name"
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="w-full px-4 py-4 ml-2 border rounded-lg text-gray-700"
            placeholder="Last name"
          />
        </div>
        <div>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full px-4 py-4 border rounded-lg text-gray-700"
            placeholder="Address"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            id="district"
            name="district"
            className="w-full px-4 py-4 mr-2 border rounded-lg text-gray-700"
            placeholder="District"
          />
          <input
            type="text"
            id="province"
            name="province"
            className="w-full px-4 py-4 ml-2 border rounded-lg text-gray-700"
            placeholder="Province"
          />
        </div>

        <div className="flex">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            id="contactnumber"
            name="contactnumber"
            className="w-full px-4 py-4 border rounded-lg text-gray-700"
            placeholder="Phone number"
            readOnly
          />
        </div>
        <div className="pt-8">
          <button
            type="submit"
            className="w-full text-white px-4 py-4 rounded-full hover:bg-blue-600"
            style={{ backgroundColor: "#1EA1F1" }}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterInformationForm;
