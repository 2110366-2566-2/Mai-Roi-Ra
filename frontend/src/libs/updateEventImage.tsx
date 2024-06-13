import { apiBackUrl } from "../constants";

export default async function updateEventImage(
  id: string,
  formData: FormData,
  token: string,
) {
  try {
    console.log(formData);

    const response = await fetch(
      `http://localhost:8080/api/v1/events/upload/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update event image: ${response.status} - ${errorData.message || "Unknown error"}`,
      );
    }
    console.log("Response from update image:", response);
    return await response.json();
  } catch (error) {
    throw new Error(`Error updating event image: ${error}`);
  }
}
