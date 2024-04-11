import { apiBackUrl } from "../constants";

export default async function isEmailVerified(email: string) {
  const url = new URL(`${apiBackUrl}/users/verification_status`);
  url.searchParams.append("email", email);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch email verification status");
  }

  return await response.json();
}
