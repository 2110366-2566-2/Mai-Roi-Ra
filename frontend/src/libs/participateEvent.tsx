"use server";
import { revalidatePath } from "next/cache";
import { apiBackUrl } from "../constants";

export default async function participateEvent(
  amount: number,
  event_id: string,
  num_participant: number,
  user_id: string,
  token: string,
) {
  const response = await fetch(`${apiBackUrl}/users/participate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount,
      event_id,
      num_participant,
      user_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register to an Event (cannot participate)");
  }

  revalidatePath(`/events/${event_id}`);

  return await response.json();
}
