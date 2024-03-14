"use server";
import { apiBackUrl } from "../constants";

export default async function cancelParticipate(
  event_id: string,
) {


  const response = await fetch(`${apiBackUrl}/users/${event_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        event_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register to an Event (cannot participate)");
  }

  return await response.json();
}
