import { apiBackUrl } from "../constants";

export default async function getRejectedEvents(token: string) {
  const response = await fetch(`${apiBackUrl}/events?filter=Rejected`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["waiting-events"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  console.log("success");
  return await response.json();
}
