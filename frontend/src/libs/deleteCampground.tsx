import { apiBackUrl } from "../constants";

export default async function deleteCampground(cid: string, token: string) {
    try {
        const response = await fetch(`${apiBackUrl}/campgrounds/${cid}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to delete campground: ${response.status} - ${errorData.message || "Unknown error"
                }`
            );
        }
        console.log("I DELETE IT")
        return { success: true };
    } catch (error) {
        throw new Error(`Error deleting campground: ${error}`);
    }
}
