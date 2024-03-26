"use server";
import { revalidatePath, revalidateTag } from "next/cache";
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
    console.log("Update Booking successful (in Action)");
    console.log(res);
  } catch (err) {
    console.log("Error during action: ", err);
  }
  revalidateTag(`profile/${user_id}`);
  revalidateTag(`profile`);
  revalidatePath("/profile");

  
}
