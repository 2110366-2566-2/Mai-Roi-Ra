"use client";
import React, { useState, FormEvent } from "react";
import styles from "@/styles/FontPage.module.css";
import { useRouter } from "next/navigation";
import updateProfile from "@/libs/updateProfile";
import updateProfileAction from "@/action/updateProfileAction";

interface Props {
  firstNameProp: string;
  lastNameProp: string;
  addressProp: string;
  districtProp: string;
  provinceProp: string;
  phoneNumberProp: string;
  emailProp: string;
  birthDateProp: string;
}

export default function EditProfileForm({
  firstNameProp,
  lastNameProp,
  addressProp,
  districtProp,
  provinceProp,
  phoneNumberProp,
  emailProp,
  birthDateProp,
}: Props) {
  // USER FIELDS
  const [firstName, setFirstName] = useState(firstNameProp);
  const [lastName, setLastName] = useState(lastNameProp);
  const [address, setAddress] = useState(addressProp);
  const [district, setDistrict] = useState(districtProp);
  const [province, setProvince] = useState(provinceProp);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberProp);
  const [email, setEmail] = useState(emailProp);
  const [birthDate, setBirthDate] = useState(birthDateProp);
  const [profilePicture, setProfilePicture] = useState();
  const [backgroundPicture, setBackgroundPicture] = useState();

  const [allInputsFilled, setAllInputsFilled] = useState(true);

  const reformatDate = (dateStr: string) => {
    return dateStr.split("T")[0].replace(/-/g, "/");
  };

  const formattedDate = reformatDate(birthDate);

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

  // const [successModal, setSuccessModal] = useState(false);

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleEditProfileSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (firstName && lastName && address && district && province && birthDate) {
      try {
        await updateProfileAction(
          "e44cd955-914a-430c-9037-6c433aa5c1fd",
          firstName,
          lastName,
          address,
          district,
          province,
          formattedDate
        );
        setAllInputsFilled(true);
        setError("");
        // setSuccessModal(true);
        // setTimeout(() => {
        //   setSuccessModal(false);
        //   router.push("/profile");
        // }, 4000);
      } catch (err) {
        setError("Update error. Server Failed ?");
        console.log("Err: ", err);
      }
    } else {
      setAllInputsFilled(false);
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleEditProfileSubmit}>
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
            {firstName && (
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
            {lastName && (
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
          {address && (
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
            {district && (
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
            {province && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                Province
              </div>
            )}
          </div>
        </div>
        {phoneNumber ? (
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
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Phone number
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
              placeholder="Email"
              readOnly
            />
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Email
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            id="birthdate"
            name="birthdate"
            value={formattedDate}
            onChange={handleBirthDateChange}
            className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
            placeholder="Birth Date"
          />
          {birthDate && (
            <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
              Birth Date
            </div>
          )}
        </div>
        <div className="flex flex-col !mt-2">
          <div style={{ color: "#F16E1E" }}>
            {allInputsFilled ? "" : "All fields must be filled correctly !"}
          </div>
        </div>
        <div className="pt-8">
          <button
            type="submit"
            className="w-full text-white px-4 py-4 rounded-full hover:bg-blue-600"
            style={{ backgroundColor: "#F2D22E" }}
          >
            Done
          </button>
        </div>
      </form>
      {/* {successModal && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75"></div>
          <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-lg max-w-lg w-2/5 h-auto z-50">
            <div className="text-gray-600">Successfully edit profile!</div>
          </div>
        </div>
      )} */}
    </div>
  );
}
