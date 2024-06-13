import { apiBackUrl, provider } from "../constants";

export default async function getGoogleLoginInfo(code: string | string[]) {
  const response = await fetch(
    `${apiBackUrl}/auth/${provider}/callback/?code=${code}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch google info");
  }
  console.log("Success on getting google info");
  return await response.json();
}
