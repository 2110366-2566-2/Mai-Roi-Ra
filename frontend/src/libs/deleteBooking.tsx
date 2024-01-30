import { apiBackUrl } from "../constants";

export default async function deleteBooking(bid: string, token: string) {
    try {
        const response = await fetch(`${apiBackUrl}/bookings/${bid}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to delete booking: ${response.status} - ${errorData.message || "Unknown error"
                }`
            );
        }
        console.log("I DELETE IT")
        return { success: true };
    } catch (error) {
        throw new Error(`Error deleting booking: ${error}`);
    }
}
