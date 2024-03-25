import { apiBackUrl } from "../constants"

export default async function userLogout(token: string) {
    const response = await fetch(`${apiBackUrl}/logout`, {
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