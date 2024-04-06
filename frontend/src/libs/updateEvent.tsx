import { apiBackUrl } from "../constants";

export default async function updateEvent(
    id: string,
    formData: FormData,
    token: string
) {

    try {
        console.log(formData);

        const response = await fetch(`${apiBackUrl}/events/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to update event: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        }
        console.log("Response from update:", response)
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating event: ${error}`);
    }
}
