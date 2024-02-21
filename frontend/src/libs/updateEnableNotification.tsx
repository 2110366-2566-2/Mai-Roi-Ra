"use server";
import { apiBackUrl } from "../constants";

export default async function updateEnableNotification(user_id: string) {
  try {
    const jsonBody = JSON.stringify({
      user_id: user_id,
    });
    const response = await fetch(`${apiBackUrl}/users/notification`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      next: { tags: ["updateEnableNotification"] },
      body: jsonBody,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update enable notification: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error updating enable notification: ${error}`);
  }
}
