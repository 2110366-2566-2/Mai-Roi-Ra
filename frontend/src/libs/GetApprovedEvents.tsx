import { apiBackUrl } from "../constants";

export default async function getApprovedEvents() {
  const response = await fetch(`${apiBackUrl}/events?filter=Approved`, {
    method: "GET",
    next: { tags: ["waiting-events"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  console.log("success");
  return await response.json();
}
