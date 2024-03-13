import { apiBackUrl } from "../constants";

export default async function getMyUserEvents(id: string) {
  const response = await fetch(`${apiBackUrl}/users/events?user_id=${id}`, {
    method: "GET",
    next: { tags: ["events"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user events");
  }
  console.log(`success`);
  return await response.json();
}
