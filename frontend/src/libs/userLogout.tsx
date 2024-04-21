export default async function userLogout(token: string) {
    const response = await fetch(`${process.env.LOGOUT_URL}/api/v1/logout`, {
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