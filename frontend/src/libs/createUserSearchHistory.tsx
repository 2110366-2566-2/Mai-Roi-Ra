import { apiBackUrl } from "../constants";

export default async function createUserSearchHistory(
    user_id: string,
    search: string,
    token: string
) {
    const url = new URL(`${apiBackUrl}/users/${user_id}/searchevent`);
    url.searchParams.append('search',search);

    try {
        const jsonBody = JSON.stringify({
            "user_id" : user_id,
            "search" : search,
        });

        const response = await fetch(url , {
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
                `Failed to create search history: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } console.log("Success To Create User");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating user : ${error}`);
    }
}
