import { apiBackUrl } from "../constants";

export default async function getEvent(id: string) {
  const response = await fetch(`${apiBackUrl}/events/${id}`, {
    method: "GET",
    next: { tags: ["event"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  console.log("success");
  return await response.json();
}
