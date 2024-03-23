import { apiBackUrl } from "../constants";

export default async function rejectEvent(event_id: string) {
  try {
    const response = await fetch(
      `${apiBackUrl}/events/${event_id}/verify?status=Rejected`, // Removed extra quote after Approved
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Uncomment and populate the token as needed
        },
        // Removed the next object and body since they are not needed
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
    // Make sure to log the actual error message from the caught error object
    throw new Error(`Error rejecting event: ...`);
  }
}
