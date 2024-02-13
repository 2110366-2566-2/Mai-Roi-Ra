import { apiBackUrl } from "../constants";

export default async function createEvent(
    organizer_id: string,
    name: string,
    activity: string,
    location_name: string,
    district: string,
    province: string,
    price:number,
    description: string,
    imageSrc: string,
    start_date: string,
    end_date: string
) {
    try {
        console.log(organizer_id, name, activity, location_name, district, province, description, imageSrc, start_date, end_date);
        const jsonBody = JSON.stringify({
            "activities": activity,
            "city": province,
            "description": description,
            "end_date": end_date,
            "event_image": imageSrc,
            "event_name": name,
            "location_name": location_name,
            "district": district,
            "province": province,
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
        } console.log("Success To Create Event");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating event: ${error}`);
    }
}
