import { apiBackUrl } from "../constants";

export default async function getReviewEventById(event_id:string,token:string) {
  const response = await fetch(`${apiBackUrl}/posts/events/${event_id}`, {
    method: "GET",
    next: { tags: ["review_event"] },
    headers: {
        authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch review events by id");
  }
  console.log("success");
  return await response.json();
}
