import { apiBackUrl } from "../constants";

export default async function replyProblem(
  admin_username: string,
  description: string,
  problem: string,
  problem_id: string,
  reply: string,
  status: string,
  token: string
) {
  try {
    const requestBody = {
      admin_username,
      description,
      problem,
      problem_id,
      reply,
      status,
    };

    const response = await fetch(`http://localhost:8080/api/v1/problems/${problem_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update problem: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error updating problem`);
  }
}
