import { apiBackUrl } from "../constants";

export default async function getIsOrganizerGotMoney(
  organizer_id: string,
  event_id: string
) {
  if (!organizer_id || !event_id) throw new Error("Failed to fetch isOrganizerGotMoney");
  const response = await fetch(
    `${apiBackUrl}/transactions/is_paid?organizer_id=${organizer_id}&&event_id=${event_id}`,
    {
      method: "GET",
      headers: {},
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch isOrganizerGotMoney");
  }

  return await response.json();
}
