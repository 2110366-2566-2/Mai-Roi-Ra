import { apiBackUrl } from "../constants";

export default async function createBooking(
    cid: string,
    bookingDate: string,
    checkoutDate: string,
    token: string
) {
    try {
        const jsonBody = JSON.stringify({
            "bookingDate": bookingDate,
            "checkoutDate": checkoutDate,
        })
        console.log(jsonBody)
        const response = await fetch(`${apiBackUrl}/campgrounds/${cid}/bookings`, {
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
                `Failed to create booking: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error creating booking: ${error}`);
    }
}
