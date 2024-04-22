import { apiBackUrl } from "../constants";

export default async function createTransferToOrganizer(
    organizer_id: string,
    event_id: string,
    token: string
) {
    try {
        const jsonBody = JSON.stringify({
            event_id : event_id,
            organizer_id : organizer_id
          })
        const response = await fetch(`${apiBackUrl}/transactions/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },next: {tags: ['createTransferToOrganizer']},
            body: jsonBody,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create transferToOrganizer: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to create transferToOrganizer: ${error}`);
    }
}
