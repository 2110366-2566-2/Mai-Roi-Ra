"use client";
import React, { useState } from "react";

interface RegisterInformationFormProps {
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  province: string;
  phoneNumber: string;
  email: string;

  useEmail: boolean;

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
  email,

  useEmail,

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
          <div className="relative w-full mr-2">
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstName}
              onChange={handleFirstNameChange}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
              placeholder="First name"
            />
            {firstName.length != 0 && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                First Name
              </div>
            )}
          </div>
          <div className="relative w-full ml-2">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastName}
              onChange={handleLastNameChange}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
              placeholder="Last name"
            />
            {lastName.length != 0 && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                Last Name
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleAddressChange}
            className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
            placeholder="Address"
          />
          {address.length != 0 && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Address
            </div>
          )}
        </div>
        <div className="flex ">
          <div className="relative w-full mr-2">
            <input
              type="text"
              id="district"
              name="district"
              value={district}
              onChange={handleDistrictChange}
              className="w-full px-4 py-4  border rounded-lg text-gray-700 focus:outline-none "
              placeholder="District"
            />
            {district.length != 0 && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                District
              </div>
            )}
          </div>
          <div className="relative w-full ml-2">
            <input
              type="text"
              id="province"
              name="province"
              value={province}
              onChange={handleProvinceChange}
              className="w-full px-4 py-4  border rounded-lg text-gray-700 focus:outline-none "
              placeholder="Province"
            />
            {province.length != 0 && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                Province
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          {!useEmail ? (
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phoneNumber}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
              placeholder="Phone number"
              readOnly
            />
          ) : (
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
              placeholder="Phone number"
              readOnly
            />
          )}
          {phoneNumber.length != 0 && !useEmail && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Phone number
            </div>
          )}
          {email.length != 0 && useEmail && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400 ">
              Email
            </div>
          )}
        </div>
        {!allInfoInputsFilled && (
          <div className="" style={{ color: "#F16E1E" }}>
            All fields must be filled correctly !
          </div>
        )}
        {/* <div>
          <div style={{ color: "#F16E1E" }}>
            {allInfoInputsFilled ? "" : "All fields must be filled correctly !"}
          </div>
        </div> */}
        <div className="">
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
