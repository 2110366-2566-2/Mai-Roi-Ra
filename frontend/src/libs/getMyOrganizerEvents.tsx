import { apiBackUrl } from "../constants";

export default async function getMyOrganizerEvents(id: string) {
  const response = await fetch(`${apiBackUrl}/events?organizer_id=${id}`, {
    method: "GET",
    next: { tags: ["events"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organizer events");
  }
  console.log(`success`);
  return await response.json();
}
