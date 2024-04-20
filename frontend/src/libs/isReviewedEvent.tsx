import { apiBackUrl } from "../constants";

export default async function isReviewedEvent(
  user_id: string,
  event_id: string
) {
  if (!user_id || !event_id) return { is_registered: true };
  const response = await fetch(
    `${apiBackUrl}/posts/is_reviewed?user_id=${user_id}&&event_id=${event_id}`,
    {
      method: "GET",
      headers: {},
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch isReviewedEvent");
  }

  return await response.json();
}
