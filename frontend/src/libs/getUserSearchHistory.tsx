import { apiBackUrl } from "../constants";

export default async function getUserSearchHistory(user_id : string) {

	const response = await fetch(`${apiBackUrl}/users/${user_id}/searchhistory`, {
		method: "GET",
		headers: {
		'Accept': 'application/json', 
		}, next: {
            tags: ['searchhistory']
        }
	});

	if (!response.ok) {
		throw new Error("Failed to fetch search history");
	}
	console.log(`success`);
	return await response.json();
}
