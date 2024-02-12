"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/FontPage.module.css";

export default function EditProfileForm() {
  // USER FIELDS
  const [firstName, setFirstName] = useState("Wish");
  const [lastName, setLastName] = useState("Marukapitak");
  const [address, setAddress] = useState("315/150 Chamchuri Square");
  const [district, setDistrict] = useState("Payathai");
  const [province, setProvince] = useState("Bangkok");
  const [phoneNumber, setPhoneNumber] = useState("0968800127");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("1 Nov 2003");
  const [profilePicture, setProfilePicture] = useState("");
  const [backgroundPicture, setBackgroundPicture] = useState("");

  // HANDLER for fields
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

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBirthDate = event.target.value;
    setBirthDate(newBirthDate);
  };

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
            Information
          </div>
        </div>
        <div className="w-full">
          <form className="space-y-6">
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
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                placeholder="Phone number"
                readOnly
              />
              {phoneNumber.length != 0 && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                  Phone number
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                id="birthdate"
                name="birthdate"
                value={birthDate}
                onChange={handleBirthDateChange}
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                placeholder="Birth Date"
              />
              {birthDate.length != 0 && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                  Birth Date
                </div>
              )}
            </div>

            {/* <div className="relative">
              <input
                type="text"
                id="paymentmethod"
                name="paymentmethod"
                // value={phoneNumber}
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                placeholder="Payment method"
                readOnly
              />
            </div> */}

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
      </div>
    </div>
  );
}
