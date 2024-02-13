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
  const response = await fetch(`${apiBackUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: userAddress,
      district: userDistrict,
      email: userEmail,
      first_name: userFirstName,
      last_name: userLastName,
      password: userPassword,
      phone_number: userPhoneNumber,
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
