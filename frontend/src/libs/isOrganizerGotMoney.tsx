import { apiBackUrl } from "../constants";

export default async function getIsOrganizerGotMoney(
  organizer_id: string,
  event_id: string,
  token: string,
) {
  if (!organizer_id || !event_id)
    throw new Error(
      "Failed to fetch isOrganizerGotMoney : missing organizer_id or event_id",
    );
  const response = await fetch(
    `http://localhost:8080/api/v1/transactions/is_paid?organizer_id=${organizer_id}&&event_id=${event_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch isOrganizerGotMoney");
  }

  return await response.json();
}
