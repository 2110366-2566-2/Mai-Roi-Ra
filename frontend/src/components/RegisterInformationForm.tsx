"use client";
import React, { useState } from "react";

interface RegisterInformationFormProps {
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  province: string;
  phoneNumber: string;

  allInfoInputsFilled: boolean;

  handleFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDistrictChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProvinceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  handleBackwardClick: () => void;
  handleInfoSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterInformationForm: React.FC<RegisterInformationFormProps> = ({
  firstName,
  lastName,
  address,
  district,
  province,
  phoneNumber,

  allInfoInputsFilled,

  handleFirstNameChange,
  handleLastNameChange,
  handleAddressChange,
  handleDistrictChange,
  handleProvinceChange,
  handlePhoneNumberChange,

  handleBackwardClick,
  handleInfoSubmit,
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
      <form className="space-y-6" onSubmit={handleInfoSubmit}>
        <div className="flex">
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstName}
            onChange={handleFirstNameChange}
            className="w-full px-4 py-4 mr-2 border rounded-lg text-gray-700"
            placeholder="First name"
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={handleLastNameChange}
            className="w-full px-4 py-4 ml-2 border rounded-lg text-gray-700"
            placeholder="Last name"
          />
        </div>
        <div>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleAddressChange}
            className="w-full px-4 py-4 border rounded-lg text-gray-700"
            placeholder="Address"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            id="district"
            name="district"
            value={district}
            onChange={handleDistrictChange}
            className="w-full px-4 py-4 mr-2 border rounded-lg text-gray-700"
            placeholder="District"
          />
          <input
            type="text"
            id="province"
            name="province"
            value={province}
            onChange={handleProvinceChange}
            className="w-full px-4 py-4 ml-2 border rounded-lg text-gray-700"
            placeholder="Province"
          />
        </div>

        <div className="flex">
          <input
            type="tel"
            id="contactnumber"
            name="contactnumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full px-4 py-4 border rounded-lg text-gray-700"
            placeholder="Phone number"
            readOnly
          />
        </div>
        <div>
          <div style={{ color: "#F16E1E" }}>
            {allInfoInputsFilled ? "" : "All fields must be filled correctly !"}
          </div>
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
