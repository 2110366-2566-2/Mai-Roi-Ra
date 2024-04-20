import { apiBackUrl } from "../constants";

export default async function getUserSearchHistory(user_id: string, token: string) {
	const response = await fetch(`${apiBackUrl}/users/${user_id}/searchhistory`, {
		method: "GET",
		next: {
            tags: ['searchhistory']
        },
		headers: {
			'Accept': 'application/json', 
			authorization: `Bearer ${token}`,
		}
	});

	if (!response.ok) {
		throw new Error("Failed to fetch search history");
	}
	console.log(`success`);
	return await response.json();
}
