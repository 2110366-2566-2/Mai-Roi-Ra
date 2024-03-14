"use server";
import { apiBackUrl } from "../constants";

export default async function userRegister(
  event_id: string,
  num_participant : number,
  user_id : string
) {


  const response = await fetch(`${apiBackUrl}/users/participate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // next: { tags: ["ีuserRegister"] },
    body: JSON.stringify({
        event_id,
        num_participant,
        user_id
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register to an Event (cannot participate)");
  }

  return await response.json();
}
