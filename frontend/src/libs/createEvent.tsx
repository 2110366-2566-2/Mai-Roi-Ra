import { apiBackUrl } from "../constants";

export default async function createEvent(
    organizer_id: string,
    name: string,
    activity: string,
    location_name: string,
    district: string,
    province: string,
    price: string,
    description: string,
    image: File,
    start_date: string,
    end_date: string,
    token:string
) {
    try {
        console.log(organizer_id, name, activity, location_name, district,price, province, description, start_date, end_date);

        const formData = new FormData();
        formData.append('activities', activity);
        formData.append('city', image);
        formData.append('description', description);
        formData.append('district', district);
        formData.append('end_date', end_date);
        formData.append('event_image', image);
        formData.append('event_name', name);
        formData.append('location_name', location_name);
        formData.append('organizer_id', organizer_id);
        formData.append('participant_fee', price);
        formData.append('start_date', start_date);
        formData.append('status', "Waiting");
        // const jsonBody = JSON.stringify({
        //     "activities": activity,
        //     "city": province,
        //     "description": description,
        //     "district": district,
        //     "end_date": end_date,
        //     "event_image": image,
        //     "event_name": name,
        //     "location_name": location_name,
        //     "organizer_id": organizer_id,
        //     "participant_fee": Number(price),
        //     "start_date": start_date,
        //     "status": "Waiting"
        // });

        console.log(formData);

        const response = await fetch(`${apiBackUrl}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        console.log(formData);
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
