import { apiBackUrl } from "../constants"; // Make sure this constant is correctly defined in your constants file

export default async function responsePost(
  detail: string,
  organizer_id: string,
  post_id: string,
  token: string
) {
  try {
    const requestBody = {
      detail: detail,
      organizer_id: organizer_id,
      post_id: post_id,
    };

    const response = await fetch(`${apiBackUrl}/responses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to post response: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Error in posting response`);
  }
}
