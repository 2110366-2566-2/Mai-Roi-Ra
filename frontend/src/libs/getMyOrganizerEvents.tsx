import { apiBackUrl } from "../constants";

export default async function getMyOrganizerEvents(id: string, token: string) {
  const response = await fetch(`${apiBackUrl}/events?organizer_id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["events"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organizer events");
  }
  console.log(`success`);
  return await response.json();
}
