import { apiBackUrl } from "../constants";

export default async function notifyRegisterEvent(
    event_id: string,
    event_name: string,
    organizer_id: string,
    user_id: string,
) {
    try {
        console.log(event_id);
        const jsonBody = JSON.stringify({
            "event_id" : event_id,
            "event_name" : event_name,
            "organize_id": organizer_id,
            "user_id" : user_id
        });

        const response = await fetch(`${apiBackUrl}/registeredemail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: jsonBody,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create registering notification: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } console.log("Success To Create Registering Notification");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating registering notification : ${error}`);
    }
}
