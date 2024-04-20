import { apiBackUrl } from "../constants";

export default async function verifyEvent(event_id: string, token: string) {
  try {
    const response = await fetch(
      `${apiBackUrl}/events/${event_id}/verify?status=Approved`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to verify event: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error verifying event: ...`);
  }
}
