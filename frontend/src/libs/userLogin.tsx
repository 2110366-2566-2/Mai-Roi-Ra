import { revalidatePath, revalidateTag } from "next/cache";
import { apiBackUrl } from "../constants";

const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.toLowerCase());
};

export default async function userLogin(
  userName: string,
  userPassword: string,
) {
  const response = await fetch(`${apiBackUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: isValidEmail(userName) ? userName : null,
      password: userPassword,
      phone_number: isValidEmail(userName) ? null : userName,
    }),
  });
  if (!response.ok) {
    console.log(response);
    console.log(userName, userPassword);
    throw new Error("Failed to log in12");
  }
  revalidatePath("/profile");

  return await response.json();
}
