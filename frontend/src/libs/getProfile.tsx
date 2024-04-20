import { apiBackUrl } from "../constants";

export default async function getProfile(id: string, token: string) {
  const response = await fetch(`${apiBackUrl}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["profile"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  console.log("success");
  return await response.json();
}
