import { revalidatePath, revalidateTag } from "next/cache";
import { apiBackUrl } from "../constants";

export default async function createEvent(formData:FormData, token:string) {
    try {
        console.log(formData);

        const response = await fetch(`${apiBackUrl}/events/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create event: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } 
        console.log("Success To Create Event");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating event: ${error}`);
    }
}
