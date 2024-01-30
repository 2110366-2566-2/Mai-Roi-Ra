import { apiBackUrl } from "../constants";

export default async function updateBooking(
    bid: string,
    bookingDate: string,
    checkoutDate: string,
    token: string
) {
    try {
        const jsonBody = JSON.stringify({
            "bookingDate": bookingDate,
            "checkoutDate": checkoutDate,
        })
        const response = await fetch(`${apiBackUrl}/bookings/${bid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },next: {tags: ['updateBooking']},
            body: jsonBody,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to update campground: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating campground: ${error}`);
    }
}
