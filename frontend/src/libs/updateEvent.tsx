import { apiBackUrl } from "../constants";

export default async function updateEvent(
  id: string,
  name: string,
  activity: string,
  location_name: string,
  district: string,
  province: string,
  price: number,
  description: string,
  start_date: string,
  end_date: string,
  status: string,
  token: string,
) {
  try {
    console.log(
      id,
      name,
      activity,
      location_name,
      district,
      province,
      description,
      start_date,
      end_date,
    );
    const jsonBody = JSON.stringify({
      activities: activity,
      city: province,
      description: description,
      district: district,
      end_date: end_date,
      event_id: id,
      event_name: name,
      location_name: location_name,
      participant_fee: Number(price),
      start_date: start_date,
      status: status,
    });

    console.log(jsonBody);
    const response = await fetch(`${apiBackUrl}/events/${id}`, {
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
        `Failed to update event: ${response.status} - ${errorData.message || "Unknown error"}`,
      );
    }
    console.log("Response from update:", response);
    return await response.json();
  } catch (error) {
    throw new Error(`Error updating event: ${error}`);
  }
}
