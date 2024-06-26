import { apiBackUrl } from "../constants";

export default async function reviewEvent(
  caption: string,
  event_id: string,
  rating_score: number,
  user_id: string,
  token: string,
) {
  try {
    const requestBody = {
      caption,
      event_id,
      rating_score,
      user_id,
    };

    const response = await fetch(`http://localhost:8080/api/v1/posts/`, {
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
        `Failed to create post: ${response.status} - ${
          errorData.message || "Unknown error"
        }`,
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error creating post);`);
  }
}
