import { apiBackUrl } from "../constants";

export default async function getApprovedEvents(token: string) {
  const response = await fetch(`${apiBackUrl}/events?filter=Approved`, {
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
