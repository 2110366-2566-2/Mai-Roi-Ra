import { apiBackUrl } from "../constants";

export default async function createEvent(formData:FormData, token:string) {
    try {
        console.log(formData);
        console.log(formData.get('event_name'));
        console.log(formData.get('event_image'));
        for (let [key, value] of formData.entries()) {
            // Using typeof to check for primitive types
            console.log(`${key}: ${value}, Type: ${typeof value}`);
            // // Since both text fields and files are objects, use instanceof to differentiate
            // if (value instanceof File) {
            //     console.log(`${key} is a file.`);
            // } else if (value instanceof Blob) {
            //     // This will include File since File inherits from Blob, but in most cases, you'll encounter File directly for file inputs.
            //     console.log(`${key} is a Blob.`);
            // } else {
            //     // This is likely a string for text fields
            //     console.log(`${key} is likely a string.`);
            // }
        }
        
        const response = await fetch(`${apiBackUrl}/events`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            body: formData,
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
