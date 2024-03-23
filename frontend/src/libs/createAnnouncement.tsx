import { apiBackUrl } from "../constants";

export default async function createAnnouncement(
    event_id: string,
    name: string,
    header: string,
    content: string,
    token: string
) {
    try {
        console.log(event_id,name,header,content);
        const jsonBody = JSON.stringify({
            "content" : content,
            "event_id" : event_id,
            "event_name" : name,
            "subject" : header
        });

        const response = await fetch(`${apiBackUrl}/announcements`, {
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
                `Failed to create announcement: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } console.log("Success To Create Announcement");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating announcement : ${error}`);
    }
}
