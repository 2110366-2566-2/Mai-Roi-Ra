import { apiBackUrl } from "../constants";

export default async function getProblems(user_id: string, token: string) {
  const url = new URL(`${apiBackUrl}/problems`);
  url.searchParams.append("user_id", user_id);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["problems"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  console.log("success");
  return await response.json();
}
