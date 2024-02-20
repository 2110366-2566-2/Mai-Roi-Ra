import { apiBackUrl } from "../constants";

export default async function createAnnouncement(
    event_id: string,
    name: string,
    header: string,
    description: string
) {
    try {
        console.log(event_id,name,header,description);
        const jsonBody = JSON.stringify({
            "event_id" : event_id,
            "event_name" : name,
            "subject" : header,
            "content" : description
        });

        console.log(jsonBody);

        const response = await fetch(`${apiBackUrl}/announcement`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`
            },
            body: jsonBody,
        });

        console.log(jsonBody);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create announcement: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } console.log("Success To Create Announcement");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating announcement : ${error}`);
    }
}
