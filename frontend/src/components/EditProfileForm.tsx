"use client";
import React, { useState, FormEvent, useRef, ChangeEvent } from "react";
import styles from "@/styles/FontPage.module.css";
import { useRouter } from "next/navigation";
import updateProfile from "@/libs/updateProfile";
import updateProfileAction from "@/action/UpdateProfileAction";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField } from "@mui/material";
import ChooseRoleForm from "./ChooseRoleForm";
import { redirect } from "next/navigation";
import updateRole from "@/libs/updateUserRole";
import { signOut } from "next-auth/react";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import BackupIcon from "@mui/icons-material/Backup";
import uploadProfileImage from "@/libs/uploadProfileImage";

interface Props {
  firstRegister: boolean;
  firstNameProp: string;
  lastNameProp: string;
  addressProp: string;
  districtProp: string;
  provinceProp: string;
  phoneNumberProp: string;
  emailProp: string;
  birthDateProp: string;
  userId: string;
  token: string;
  user_image: string;
}

export default function EditProfileForm({
  firstRegister,
  firstNameProp,
  lastNameProp,
  addressProp,
  districtProp,
  provinceProp,
  phoneNumberProp,
  emailProp,
  birthDateProp,
  userId,
  token,
  user_image
}: Props) {
  const isMobile = useMediaQuery("(max-width:768px)");

  // USER FIELDS
  const [firstName, setFirstName] = useState(firstNameProp);
  const [lastName, setLastName] = useState(lastNameProp);
  const [address, setAddress] = useState(addressProp);
  const [district, setDistrict] = useState(districtProp);
  const [province, setProvince] = useState(provinceProp);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberProp);
  const [email, setEmail] = useState(emailProp);
  // const [birthDate, setBirthDate] = useState(birthDateProp);
  const initialBirthDate = dayjs(birthDateProp);
  const [birthDate, setBirthDate] = useState<Dayjs | null>(initialBirthDate);
  const [role, setRole] = useState("User");
  const [profilePicture, setProfilePicture] = useState();
  const [backgroundPicture, setBackgroundPicture] = useState();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user_image);
  const [is_profile,set_is_profile] = useState<string>(user_image? "True" : "False");
  const fileInputRef = useRef(null);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  const [allInputsFilled, setAllInputsFilled] = useState(true);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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

  const handleBirthDateChange = (newDate: Dayjs | null) => {
    setBirthDate(newDate);
  };

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleEditProfileSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formattedBirthDate = birthDate ? birthDate.format("YYYY/MM/DD") : "";

    if (firstName && lastName && address && district && province && birthDate && preview) {
      try {
        if (selectedImage) {
          const formData = new FormData();
          formData.append("user_id",userId);
          formData.append("is_profiled", is_profile);
          formData.append("user_image",selectedImage);
          await uploadProfileImage(formData,token);
        }

        await updateProfileAction(
          userId || "",
          firstName,
          lastName,
          address,
          district,
          province,
          formattedBirthDate
        );
        setAllInputsFilled(true);
        setError("");
        // setSuccessModal(true);
        // setTimeout(() => {
        //   setSuccessModal(false);
        //   router.push("/profile");
        // }, 4000);
        if (firstRegister) {
          setOpenChooseRoleForm(true);
        } else {
          router.push("/profile");
        }
      } catch (err) {
        setError("Update error. Server Failed ?");
        console.log("Err: ", err);
      }
    } else {
      setAllInputsFilled(false);
    }
  };

  const handleCancleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/profile");
  };

  const handleUpdateRole = async () => {
    console.log(role, userId, username);

    try {
      await updateRole(role, userId || "", username);
      // handle success, e.g. show a success message or redirect
      await signOut({ redirect: false });
      alert("Please login again");
      router.push("/auth/signin");
    } catch (error) {
      // handle error, e.g. show an error message
      console.error(`Error updating role: ${error}`);
    }
  };

  const [username, setUsername] = useState("");
  const [openChoosRoleForm, setOpenChooseRoleForm] = useState(false);
  console.log(openChoosRoleForm);

  return (
    <div className={`w-full ${openChoosRoleForm ? "" : "mt-6"}`}>
      {!openChoosRoleForm ? (
        <form className="space-y-6" onSubmit={handleEditProfileSubmit}>
          <div className="flex">
            <div className="relative w-full mr-2">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstName || ""}
                onChange={handleFirstNameChange}
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                placeholder="First name"
              />
              {firstName && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                  First Name
                </div>
              )}
            </div>
            <div className="relative w-full ml-2">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastName || ""}
                onChange={handleLastNameChange}
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                placeholder="Last name"
              />
              {lastName && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
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
              value={address || ""}
              onChange={handleAddressChange}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
              placeholder="Address"
            />
            {address && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
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
                value={district || ""}
                onChange={handleDistrictChange}
                className="w-full px-4 py-4  border rounded-lg text-gray-700 focus:outline-none "
                placeholder="District"
              />
              {district && (
                <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                  District
                </div>
              )}
            </div>
            <div className="relative w-full ml-2">
              <input
                type="text"
                id="province"
                name="province"
                value={province || "" }
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
                value={email || ""}
                className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none "
                placeholder="Email"
                readOnly
              />
              <div className="absolute top-[-8px] px-2 left-2 bg-white transition-all text-xs text-gray-400">
                Email
              </div>
            </div>
          )}

          {/* <div className="relative">
            <input
              type="text"
              id="birthdate"
              name="birthdate"
              value={formattedDate}
              onChange={handleBirthDateChange}
              className="w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none"
              placeholder="Birth Date"
            />
            {birthDate && (
              <div className="absolute top-[-8px] px-2 left-2 bg-white left-0 transition-all text-xs text-gray-400">
                Birth Date
              </div>
            )}
          </div> */}
          <div className="relative">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birth Date"
                value={birthDate}
                onChange={(e) => setBirthDate(e)}
                className="w-full"
                slotProps={{ textField: { size: "medium" } }}
              />
            </LocalizationProvider>
          </div>

          <div className="w-full h-[40vh] lg:mt-[0] md:mt-[25px] mt-[20px] border-[1px]
                     border-gray-300 rounded-md flex justify-center items-center relative border-dashed">
            {preview ? (
              <div>
                <div className="w-full h-full">
                  <Image
                    className="h-full w-full absolute top-0 left-0 opacity-60"
                    width={1000}
                    height={1000}
                    src={preview}
                    alt="Preview"
                    onClick={triggerFileInput}
                  />

                  <div className="w-full h-full overflow-hidden flex flex-row justify-center items-center">
                    <input
                      type="file"
                      name="event_image"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </div>
                </div>

                <div
                  className="absolute top-[-10px] right-[-10px] rounded-xl cursor-pointer border-black border-[1px] bg-white text-gray-500 md:w-[45px] md:h-[45px]
                                        w-[30px] h-[30px] hover:text-black hover:border-black flex flex-row justify-center items-center"
                  onClick={triggerFileInput}
                >
                  <EditIcon className="md:text-[30px] text-[20px]" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <div className="w-full h-full overflow-hidden flex flex-row justify-center items-center">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  <div
                    className="cursor-pointer text-gray-400 w-[150px] h-[150px]
                                    hover:text-black flex flex-col items-center justify-center"
                    onClick={triggerFileInput}
                  >
                    <BackupIcon style={{ fontSize: "60px" }} />
                    <div className="text-[15px]">Upload Image</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col !mt-2">
            <div style={{ color: "#F16E1E" }}>
              {allInputsFilled ? "" : "All fields must be filled correctly !"}
            </div>
          </div>

          <div className="pt-5 flex items-center justify-center">
            <button
              type="button"
              className="text-white 2xl:px-28 xl:px-20 md:px-20 px-12 py-4 xl:mr-6 mr-6 rounded-full bg-gray-300 hover:bg-gray-400"
              onClick={handleCancleClick}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white 2xl:px-28 xl:px-20 md:px-20 px-12 py-4  xl:ml-8 ml-6 rounded-full bg-[#F2D22E] hover:bg-yellow-500"
            >
              Done
            </button>
          </div>
        </form>
      ) : (
        <ChooseRoleForm
          role={role}
          setRole={setRole}
          setOpenChooseRoleForm={setOpenChooseRoleForm}
          handleUpdateRole={handleUpdateRole}
          username={username}
          setUsername={setUsername}
        />
      )}
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
