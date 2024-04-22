import { apiBackUrl } from "../constants";

export default async function getAllPendingProblems(token: string) {
  const url = new URL(`${apiBackUrl}/problems?status=Pending`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pending problems");
  }

  console.log("Successfully fetched pending problems");
  return await response.json();
}
