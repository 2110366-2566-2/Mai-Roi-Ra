import { apiBackUrl } from "@/constants";

export default async function userLogout(token: string) {
    // const response = await fetch(`${process.env.GOOGLE_AUTH_URL}/api/v1/logout`, {
    console.log("LOGOUT URL:",`${process.env.GOOGLE_AUTH_URL}/api/v1/logout`)
    const response = await fetch(`${apiBackUrl}/api/v1/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to log out");
    }
    return await response.json();
  }