import { apiBackUrl } from "../constants";

export default async function rejectEvent(event_id: string, token: string) {
  try {
    const response = await fetch(
      `${apiBackUrl}/api/v1/events/${event_id}/verify?status=Rejected`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to reject event: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error rejecting event: ...`);
  }
}
