"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import updateProfile from "@/libs/updateProfile";

export default async function UpdateProfileAction(
  user_id: string,
  firstName: string,
  lastName: string,
  address: string,
  district: string,
  province: string,
  birthDate: string
) {
  //   console.log(token);

  try {
    console.log(firstName);
    const res = await updateProfile(
      user_id,
      firstName,
      lastName,
      address,
      district,
      province,
      birthDate
    );
    console.log(res);
    console.log("Update Booking successful (in Action)");
  } catch (err) {
    console.log("Error during action: ", err);
  }
  revalidateTag(`users/${user_id}`);
  revalidateTag(`users`);
}
