"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import updateProfile from "@/libs/updateProfile";
import { redirect } from "next/navigation";

export default async function UpdateProfileAction(
  user_id: string,
  firstName: string,
  lastName: string,
  address: string,
  district: string,
  province: string,
  birthDate: string,
  token: string
) {
  try {
    console.log(firstName);
    const res = await updateProfile(
      user_id,
      firstName,
      lastName,
      address,
      district,
      province,
      birthDate,
      token
    );
    console.log("Update Booking successful (in Action)");
    console.log(res);
  } catch (err) {
    console.log("Error during action: ", err);
  }
  revalidatePath(`/editprofile`);
  revalidateTag(`profile`);
  revalidatePath("/profile");
  redirect("/profile");
}
