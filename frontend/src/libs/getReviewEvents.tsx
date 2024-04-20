import { apiBackUrl } from "../constants";

export default async function getReviewEvents(user_id:string,token:string) {
  const response = await fetch(`${apiBackUrl}/events/end/${user_id}`, {
    method: "GET",
    next: { tags: ["review_event"] },
    headers: {
        authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch review events");
  }
  console.log("success");
  return await response.json();
}
