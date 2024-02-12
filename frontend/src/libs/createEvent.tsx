import { apiBackUrl } from "../constants";

export default async function createEvent(
    organizer_id: string,
    name: string,
    location_name: string,
    price:number,
    description: string,
    imageSrc: string,
    start_date: string,
    end_date: string,
    deadline: string
) {
    try {
        console.log(organizer_id, name, location_name, description, imageSrc, start_date, end_date, deadline)
        const jsonBody = JSON.stringify({
            "activities":"events activities",
            "deadline": deadline,
            "description": description,
            "end_date": end_date,
            "event_image": imageSrc,
            "event_name": name,
            "location_name": location_name,
            "organizer_id": organizer_id,
            "participant_fee": price,
            "start_date": start_date,
            "status": "Waiting"
        })

        const response = await fetch(`${apiBackUrl}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`
            },
            body: jsonBody,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create event: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        }
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating event: ${error}`);
    }
}
