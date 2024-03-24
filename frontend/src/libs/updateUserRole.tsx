import { apiBackUrl } from "../constants";

export default async function updateRole(role: string, user_id: string, token: string, username: string) {
    try {
      const jsonBody = JSON.stringify({
        role: role,
        user_id: user_id,
        username: username
      });
      const response = await fetch(`${apiBackUrl}/users/update_user_role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jsonBody,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update role: ${response.status} - ${
            errorData.message || "Unknown error"
          }`
        );
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Error updating role: ${error}`);
    }
  }
