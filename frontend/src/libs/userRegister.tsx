"use server";
import { apiBackUrl } from "../constants";

export default async function userRegister(
  userUsername: string,
  userPhoneNumber: string,
  userEmail: string,
  userPassword: string,
  userRole: string,
  userFirstName: string,
  userLastName: string,
  userAddress: string,
  userDistrict: string,
  userProvince: string
) {
  const emailToSend = userEmail === "" ? null : userEmail;
  const phoneNumberToSend = userPhoneNumber === "" ? null : userPhoneNumber;

  const response = await fetch(`${apiBackUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // next: { tags: ["ีuserRegister"] },
    body: JSON.stringify({
      address: userAddress,
      district: userDistrict,
      email: emailToSend,
      first_name: userFirstName,
      last_name: userLastName,
      password: userPassword,
      phone_number: phoneNumberToSend,
      province: userProvince,
      role: userRole,
      username: userUsername,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return await response.json();
}
