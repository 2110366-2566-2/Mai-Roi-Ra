import { apiBackUrl } from "../constants";

export default async function updateProfile(
  user_id: string,
  firstName: string,
  lastName: string,
  address: string,
  district: string,
  province: string,
  birthDate: string
) {
  try {
    const jsonBody = JSON.stringify({
      user_id: user_id,
      first_name: firstName,
      last_name: lastName,
      address: address,
      district: district,
      province: province,
      birth_date: birthDate,
      phone_number: "1234567890",
      user_image: "https://example.com/user1.jpg",
    });
    const response = await fetch(`${apiBackUrl}/users/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      next: { tags: ["updateProfile"] },
      body: jsonBody,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update profile: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error updating profile: ${error}`);
  }
}
