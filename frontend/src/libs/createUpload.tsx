import { apiBackUrl } from "../constants";

export default async function createEvent(formData:FormData) {
    try {
        console.log(formData);
        console.log(formData.get('image'));
        
        const response = await fetch(`${apiBackUrl}/upload`, {
            method: "POST",
            body: formData
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
