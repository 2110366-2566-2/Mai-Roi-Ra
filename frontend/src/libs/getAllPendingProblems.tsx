import { apiBackUrl } from "../constants";

export default async function getAllPendingProblems() {
  const url = new URL(`${apiBackUrl}/problems?status=Pending`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pending problems");
  }

  console.log("Successfully fetched pending problems");
  return await response.json();
}
