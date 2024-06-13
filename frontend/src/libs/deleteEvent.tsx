import { apiBackUrl } from "../constants";

export default async function deleteEvent(id: string, token: string) {
  try {
    const response = await fetch(`${apiBackUrl}/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to delete event: ${response.status} - ${
          errorData.message || "Unknown error"
        }`,
      );
    }
    console.log("I DELETE IT");
    return { success: true };
  } catch (error) {
    throw new Error(`Error deleting event: ${error}`);
  }
}
