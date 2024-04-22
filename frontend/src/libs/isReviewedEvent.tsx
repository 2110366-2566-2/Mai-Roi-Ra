import { apiBackUrl } from "../constants";

export default async function isReviewedEvent(
  user_id: string,
  event_id: string,
  token: string
) {
  if (!user_id || !event_id) return { is_registered: true };
  const response = await fetch(
    `http://localhost:8080/api/v1/posts/is_reviewed?user_id=${user_id}&&event_id=${event_id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch isReviewedEvent");
  }

  return await response.json();
}
